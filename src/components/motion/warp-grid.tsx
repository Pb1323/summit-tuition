"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Fine grid backdrop that bends around the cursor, like a sheet of spacetime under a light gravity well.
 * Sits behind all page content (negative z-index) — never competes with foreground contrast.
 */
export function WarpGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const SPACING = 64;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let cols = 0;
    let rows = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / SPACING) + 1;
      rows = Math.ceil(height / SPACING) + 1;
    };
    resize();

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(23, 32, 51, 0.07)";
      ctx.lineWidth = 1;
      for (let c = 0; c < cols; c++) {
        const x = c * SPACING;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let r = 0; r < rows; r++) {
        const y = r * SPACING;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    if (reduceMotion) {
      drawStatic();
      window.addEventListener("resize", () => {
        resize();
        drawStatic();
      });
      return;
    }

    const pointer = { x: width / 2, y: height * 0.32, active: false };
    const displayPointer = { x: pointer.x, y: pointer.y };
    const RADIUS = 200;
    const STRENGTH = 14;

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);

    const warp = (x: number, y: number) => {
      const dx = x - displayPointer.x;
      const dy = y - displayPointer.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > RADIUS || dist < 0.0001) return { x, y };
      const falloff = 1 - dist / RADIUS;
      const pull = falloff * falloff * STRENGTH;
      return { x: x - (dx / dist) * pull, y: y - (dy / dist) * pull };
    };

    let frame: number;
    const draw = () => {
      displayPointer.x += (pointer.x - displayPointer.x) * 0.08;
      displayPointer.y += (pointer.y - displayPointer.y) * 0.08;

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(23, 32, 51, 0.08)";
      ctx.lineWidth = 1;

      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const p = warp(c * SPACING, r * SPACING);
          if (c === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const p = warp(c * SPACING, r * SPACING);
          if (r === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      if (pointer.active) {
        const glow = ctx.createRadialGradient(
          displayPointer.x,
          displayPointer.y,
          0,
          displayPointer.x,
          displayPointer.y,
          RADIUS * 0.55
        );
        glow.addColorStop(0, "rgba(245, 158, 11, 0.1)");
        glow.addColorStop(1, "rgba(245, 158, 11, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(displayPointer.x, displayPointer.y, RADIUS * 0.55, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", resize);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[-1] h-screen w-screen"
    />
  );
}
