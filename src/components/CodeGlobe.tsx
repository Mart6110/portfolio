"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const WORDS = [
  "React", "Angular", "TypeScript", "JavaScript", "Go", "C#", "PostgreSQL", "MySQL", "Redux",
  "HTML", "CSS", "Git", "GitHub", "Chakra UI", "AntD", "CapacitorJS", "Vitest", "IoT", "Full-Stack", "UI/UX",
  "REST API", "SCSS", "Redux Toolkit", "Systems",
];

const POINT_COUNT = 220;
const TILT = -0.45;
const ROTATION_SPEED = 0.00022;
const FONT_SIZE_BASE = 14;
const FRAME_INTERVAL = 32;
const FONT_STACK = 'ui-monospace, "SFMono-Regular", "JetBrains Mono", Menlo, Consolas, monospace';

interface Point {
  bx: number;
  by: number;
  bz: number;
  word: string;
}

function randomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function tiltPoint(x: number, y: number, z: number): [number, number, number] {
  const cos = Math.cos(TILT);
  const sin = Math.sin(TILT);
  return [x, y * cos - z * sin, y * sin + z * cos];
}

function buildPoints(): Point[] {
  const points: Point[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < POINT_COUNT; i++) {
    const y = 1 - (i / (POINT_COUNT - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    const [bx, by, bz] = tiltPoint(x, y, z);
    points.push({ bx, by, bz, word: randomWord() });
  }

  return points;
}

export default function CodeGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let radius = 0;
    let centerX = 0;
    let centerY = 0;
    let focal = 0;
    let rotation = 0.6;
    let lastTime = 0;
    let frame = 0;
    let alphaScale = 1;
    let visiblePoints: Point[] = [];
    let accent = "#f97316";

    const allPoints = buildPoints();

    const readAccent = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue("--brand").trim();
      if (raw) accent = raw;
    };

    const resize = () => {
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const compact = width < 640;
      radius = compact
        ? Math.max(Math.min(width * 0.5, 195), 140)
        : Math.max(Math.min(Math.min(width, height) * 0.6, 560), 280);
      focal = radius * 3.6;
      centerX = compact ? width * 1.1 : width > 900 ? width * 0.92 : width * 0.84;
      centerY = compact ? height * 0.42 : height * 0.48;
      alphaScale = compact ? 0.35 : 1;
      visiblePoints = compact ? allPoints.filter((_, i) => i % 2 === 0) : allPoints;
    };

    const project = (bx: number, by: number, bz: number, cosA: number, sinA: number) => {
      const rx = bx * cosA + bz * sinA;
      const rz = -bx * sinA + bz * cosA;
      const ry = by;
      const X = rx * radius;
      const Y = ry * radius;
      const Z = rz * radius;
      const scale = focal / (focal + Z);
      const depth = (radius - Z) / (2 * radius);
      return { sx: centerX + X * scale, sy: centerY + Y * scale, depth };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cosA = Math.cos(rotation);
      const sinA = Math.sin(rotation);
      ctx.fillStyle = accent;

      const projected = visiblePoints
        .map((p) => {
          const { sx, sy, depth } = project(p.bx, p.by, p.bz, cosA, sinA);
          return { sx, sy, depth, word: p.word };
        })
        .sort((a, b2) => a.depth - b2.depth);

      for (const p of projected) {
        const alpha = (0.12 + p.depth * 0.8) * alphaScale;
        const fontSize = FONT_SIZE_BASE * (0.55 + p.depth * 0.6);
        ctx.font = `${fontSize}px ${FONT_STACK}`;
        ctx.globalAlpha = alpha;
        ctx.fillText(p.word, p.sx, p.sy);
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      frame = requestAnimationFrame(loop);
      const dt = lastTime ? time - lastTime : 16;
      lastTime = time;
      rotation += ROTATION_SPEED * dt;
      draw();
    };

    const handleVisibility = () => {
      cancelAnimationFrame(frame);
      lastTime = 0;
      if (document.visibilityState === "visible" && !reduceMotion) {
        frame = requestAnimationFrame(loop);
      }
    };

    readAccent();
    resize();
    draw();

    const themeObserver = new MutationObserver(readAccent);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    resizeObserver.observe(parent);

    document.addEventListener("visibilitychange", handleVisibility);

    if (!reduceMotion) {
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={cn("absolute inset-0 z-0", className)} aria-hidden="true" />;
}
