"use client";

import { useRef } from "react";

type Point = {
  x: number;
  y: number;
};

export default function MapCanvas({
  map,
  points,
  onAddPoint,
}: {
  map: string;
  points: Point[];
  onAddPoint: (p: Point) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    onAddPoint({ x, y });
  };

  return (
    <div
      ref={ref}
      onClick={handleClick}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1",
        backgroundImage: `url(${map})`,
        backgroundSize: "cover",
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.1)",
        cursor: "crosshair",
      }}
    >
      {points.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "red",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}