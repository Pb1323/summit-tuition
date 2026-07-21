"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";

function hash(a: number, b: number) {
  const s = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return s - Math.floor(s);
}

/** Height-gradient rock -> snow, used as vertex colors so faceted terrain reads with real tonal variation instead of a flat silhouette. */
function heightColor(t: number, target: THREE.Color) {
  const rockDark = 0x1e2a44;
  const rock = 0x4a5f85;
  const snow = 0xfdf6e3;
  if (t < 0.6) {
    target.setHex(rockDark).lerp(new THREE.Color(rock), t / 0.6);
  } else {
    target.setHex(rock).lerp(new THREE.Color(snow), Math.min((t - 0.6) / 0.34, 1));
  }
  return target;
}

function makeJaggedPeak(radius: number, height: number, radialSegments: number, heightSegments: number, seed: number) {
  const geo = new THREE.ConeGeometry(radius, height, radialSegments, heightSegments, false);
  const pos = geo.attributes.position;
  const colorArray = new Float32Array(pos.count * 3);
  const tmpColor = new THREE.Color();

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const heightRatio = THREE.MathUtils.clamp((y + height / 2) / height, 0, 1);
    const angle = Math.atan2(z, x);
    // Two noise octaves: broad ridges plus finer rock-face detail, for real contour instead of a smooth silhouette.
    const broad = hash(angle * 3.1 + seed, heightRatio * 5.4 + seed) * 2 - 1;
    const fine = hash(angle * 9.7 + seed * 1.7, heightRatio * 13.2 + seed * 1.3) * 2 - 1;
    const n = broad * 0.72 + fine * 0.28;
    const displacement = n * radius * 0.2 * (1 - heightRatio * 0.5);
    const len = Math.sqrt(x * x + z * z) || 1;
    const nx = x / len;
    const nz = z / len;
    pos.setX(i, x + nx * displacement);
    pos.setZ(i, z + nz * displacement);
    pos.setY(i, y + n * 0.08 * (1 - heightRatio));

    heightColor(heightRatio, tmpColor);
    colorArray[i * 3] = tmpColor.r;
    colorArray[i * 3 + 1] = tmpColor.g;
    colorArray[i * 3 + 2] = tmpColor.b;
  }
  pos.needsUpdate = true;
  geo.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));
  geo.computeVertexNormals();
  return geo;
}

function makePennantGeometry(w: number, h: number) {
  const geo = new THREE.BufferGeometry();
  const vertices = new Float32Array([0, h / 2, 0, 0, -h / 2, 0, w, 0, 0]);
  geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  geo.setIndex([0, 1, 2]);
  geo.computeVertexNormals();
  return geo;
}

function Flag() {
  const waveRef = useRef<THREE.Mesh>(null);
  const pennantGeo = useMemo(() => makePennantGeometry(0.85, 0.58), []);
  useFrame((state) => {
    if (waveRef.current) {
      waveRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2.4) * 0.3;
    }
  });
  return (
    <group position={[0, 2.52, 0]}>
      <mesh position={[0, -0.62, 0]}>
        <cylinderGeometry args={[0.026, 0.026, 1.3, 8]} />
        <meshStandardMaterial color="#e7c874" metalness={0.75} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.05, 10, 10]} />
        <meshStandardMaterial color="#f4dfa0" metalness={0.8} roughness={0.15} emissive="#c9a24b" emissiveIntensity={0.4} />
      </mesh>
      <mesh ref={waveRef} geometry={pennantGeo} position={[0.03, -0.16, 0]}>
        <meshStandardMaterial color="#f59e0b" side={THREE.DoubleSide} metalness={0.1} roughness={0.5} />
      </mesh>
    </group>
  );
}

function Peaks() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });

  const mainGeo = useMemo(() => makeJaggedPeak(1.35, 2.4, 18, 11, 3.1), []);
  const leftGeo = useMemo(() => makeJaggedPeak(0.95, 1.6, 14, 8, 7.4), []);
  const rightGeo = useMemo(() => makeJaggedPeak(0.7, 1.15, 12, 7, 11.8), []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;
    };
    const onPointer = (event: PointerEvent) => {
      pointerRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, pointerRef.current.x * 0.28 - scrollRef.current * 0.5, 0.045);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, pointerRef.current.y * 0.08, 0.045);
  });

  const sparkles = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2;
    const radius = 2.5 + (i % 4) * 0.35;
    return [Math.cos(angle) * radius, 0.5 + Math.sin(i * 2.1) * 1.1, Math.sin(angle) * radius] as const;
  });

  return (
    <group ref={groupRef} position={[0, -0.7, 0]}>
      <mesh geometry={mainGeo} position={[0, 0.9, 0]} castShadow>
        <meshPhysicalMaterial vertexColors flatShading roughness={0.62} metalness={0.08} clearcoat={0.25} clearcoatRoughness={0.55} />
      </mesh>
      <Flag />

      <mesh geometry={leftGeo} position={[-1.75, 0.45, -0.9]} rotation={[0, 0.4, 0]}>
        <meshPhysicalMaterial vertexColors flatShading roughness={0.68} metalness={0.06} clearcoat={0.2} clearcoatRoughness={0.6} />
      </mesh>

      <mesh geometry={rightGeo} position={[1.6, 0.15, -0.6]} rotation={[0, -0.3, 0]}>
        <meshPhysicalMaterial vertexColors flatShading roughness={0.68} metalness={0.06} clearcoat={0.2} clearcoatRoughness={0.6} />
      </mesh>

      <mesh position={[0, -0.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.7, 32]} />
        <meshStandardMaterial color="#4a5f85" transparent opacity={0.16} roughness={1} />
      </mesh>

      {sparkles.map((position, i) => (
        <mesh key={i} position={position as unknown as [number, number, number]}>
          <sphereGeometry args={[0.03, 10, 10]} />
          <meshStandardMaterial color="#f4dfa0" emissive="#c9a24b" emissiveIntensity={0.9} metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

export function Hero3DScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.1, 8.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <hemisphereLight args={["#dce8ff", "#3a2a12", 0.75]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 4]} intensity={2.1} color="#fff7e6" />
      <directionalLight position={[-4, 2.5, -4]} intensity={1} color="#e7c874" />
      <pointLight position={[0, 3, 4]} intensity={0.6} color="#fff2cf" />
      <Peaks />
      <EffectComposer>
        <Bloom intensity={0.5} luminanceThreshold={0.44} luminanceSmoothing={0.3} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
