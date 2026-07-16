"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";

function SealMesh() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.35;
  });
  return (
    <group ref={ref} rotation={[0.4, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[0.85, 0.85, 0.28, 8]} />
        <meshStandardMaterial color="#b45309" metalness={0.35} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <torusGeometry args={[0.55, 0.07, 12, 32]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.25} />
      </mesh>
    </group>
  );
}

function PeakMesh() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.32;
  });
  return (
    <group ref={ref} position={[0, -0.25, 0]}>
      <mesh position={[0, 0.35, 0]}>
        <coneGeometry args={[0.7, 1.15, 6]} />
        <meshStandardMaterial color="#172033" metalness={0.35} roughness={0.55} flatShading />
      </mesh>
      <mesh position={[0, 0.82, 0]}>
        <coneGeometry args={[0.26, 0.4, 6]} />
        <meshStandardMaterial color="#fdf6e3" metalness={0.1} roughness={0.65} flatShading />
      </mesh>
      <mesh position={[0.08, 0.98, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.32, 6]} />
        <meshStandardMaterial color="#e7c874" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.16, 1.08, 0]}>
        <planeGeometry args={[0.16, 0.1]} />
        <meshStandardMaterial color="#f59e0b" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

const PAPER_W = 1.5;
const PAPER_H = 1.05;
const CANVAS_W = 512;
const CANVAS_H = 358;

function buildScribbleLines() {
  const margin = 48;
  const lineCount = 4;
  const lines: { x: number; y: number }[][] = [];
  for (let li = 0; li < lineCount; li++) {
    const y = 96 + li * 56;
    const pts: { x: number; y: number }[] = [];
    const segments = 64;
    const lineWidth = CANVAS_W - margin * 2 - li * 30;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = margin + t * lineWidth;
      const wobble = Math.sin(t * 17 + li * 1.9) * 5 + Math.sin(t * 41 + li * 3.1) * 2.4;
      pts.push({ x, y: y + wobble });
    }
    lines.push(pts);
  }
  return lines;
}

function drawPaperBackground(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
  ctx.fillStyle = "#fdf9f0";
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
  ctx.strokeStyle = "rgba(23, 32, 51, 0.09)";
  ctx.lineWidth = 1;
  for (let li = 0; li < 4; li++) {
    const y = 96 + li * 56 + 14;
    ctx.beginPath();
    ctx.moveTo(30, y);
    ctx.lineTo(CANVAS_W - 24, y);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(180, 60, 60, 0.22)";
  ctx.beginPath();
  ctx.moveTo(34, 20);
  ctx.lineTo(34, CANVAS_H - 20);
  ctx.stroke();
}

function PenPaperMesh() {
  const paperRef = useRef<THREE.Mesh>(null);
  const penRef = useRef<THREE.Group>(null);
  const dataRef = useRef<{ ctx: CanvasRenderingContext2D; texture: THREE.CanvasTexture; lines: { x: number; y: number }[][] } | null>(null);
  const anim = useRef({ lineIndex: 0, pointFloat: 0, pauseTimer: 0, phase: "writing" as "writing" | "pausing" | "resetting", lastPoint: null as { x: number; y: number } | null });

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;
    const ctx = canvas.getContext("2d")!;
    drawPaperBackground(ctx);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    dataRef.current = { ctx, texture, lines: buildScribbleLines() };

    const material = paperRef.current?.material;
    if (material && !Array.isArray(material)) {
      (material as THREE.MeshStandardMaterial).map = texture;
      material.needsUpdate = true;
    }
  }, []);

  useFrame((_, delta) => {
    const data = dataRef.current;
    if (!data) return;
    const state = anim.current;
    const speed = 30;

    if (state.phase === "writing") {
      state.pointFloat += speed * delta;
      const line = data.lines[state.lineIndex];
      const maxIdx = line.length - 1;
      const t = Math.min(state.pointFloat, maxIdx);
      const i0 = Math.floor(t);
      const i1 = Math.min(i0 + 1, maxIdx);
      const frac = t - i0;
      const cur = {
        x: THREE.MathUtils.lerp(line[i0].x, line[i1].x, frac),
        y: THREE.MathUtils.lerp(line[i0].y, line[i1].y, frac),
      };

      if (state.lastPoint) {
        data.ctx.strokeStyle = "rgba(30, 41, 59, 0.86)";
        data.ctx.lineWidth = 2.4;
        data.ctx.lineCap = "round";
        data.ctx.beginPath();
        data.ctx.moveTo(state.lastPoint.x, state.lastPoint.y);
        data.ctx.lineTo(cur.x, cur.y);
        data.ctx.stroke();
        data.texture.needsUpdate = true;
      }
      state.lastPoint = cur;

      if (penRef.current) {
        const localX = (cur.x / CANVAS_W - 0.5) * PAPER_W;
        const localY = (0.5 - cur.y / CANVAS_H) * PAPER_H;
        penRef.current.position.set(localX, localY, 0.04);
      }

      if (state.pointFloat >= maxIdx) {
        state.phase = "pausing";
        state.pauseTimer = 0.35;
      }
    } else if (state.phase === "pausing") {
      state.pauseTimer -= delta;
      if (state.pauseTimer <= 0) {
        state.lineIndex += 1;
        state.pointFloat = 0;
        state.lastPoint = null;
        if (state.lineIndex >= data.lines.length) {
          state.phase = "resetting";
          state.pauseTimer = 1.1;
        } else {
          state.phase = "writing";
        }
      }
    } else {
      state.pauseTimer -= delta;
      if (state.pauseTimer <= 0) {
        drawPaperBackground(data.ctx);
        data.texture.needsUpdate = true;
        state.lineIndex = 0;
        state.pointFloat = 0;
        state.lastPoint = null;
        state.phase = "writing";
      }
    }
  });

  return (
    <group rotation={[-0.85, 0, 0.12]} scale={0.72}>
      <mesh ref={paperRef}>
        <planeGeometry args={[PAPER_W, PAPER_H]} />
        <meshStandardMaterial color="#fdf9f0" roughness={0.92} metalness={0} />
      </mesh>
      <group ref={penRef} rotation={[0.15, 0, -0.85]}>
        <mesh position={[0, 0.09, 0]}>
          <coneGeometry args={[0.03, 0.14, 10]} />
          <meshStandardMaterial color="#e7c874" metalness={0.85} roughness={0.18} />
        </mesh>
        <mesh position={[0, 0.64, 0]}>
          <cylinderGeometry args={[0.05, 0.058, 1.05, 12]} />
          <meshStandardMaterial color="#0f172a" metalness={0.25} roughness={0.22} />
        </mesh>
        <mesh position={[0, 0.17, 0]}>
          <torusGeometry args={[0.058, 0.012, 8, 24]} />
          <meshStandardMaterial color="#e7c874" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[0, 1.05, 0]}>
          <torusGeometry args={[0.058, 0.012, 8, 24]} />
          <meshStandardMaterial color="#e7c874" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.8, 0.055]} rotation={[0.25, 0, 0]}>
          <boxGeometry args={[0.014, 0.34, 0.02]} />
          <meshStandardMaterial color="#e7c874" metalness={0.85} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

const GEOMETRIES = { seal: SealMesh, peak: PeakMesh, "pen-paper": PenPaperMesh } as const;

export function MiniSceneCanvas({ geometry }: { geometry: keyof typeof GEOMETRIES }) {
  const Mesh = GEOMETRIES[geometry];
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.2], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 2]} intensity={1.3} color="#fff7e6" />
      <pointLight position={[-2, -1, 1]} intensity={0.4} color="#f59e0b" />
      <Mesh />
      <EffectComposer>
        <Bloom intensity={0.4} luminanceThreshold={0.5} luminanceSmoothing={0.3} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
