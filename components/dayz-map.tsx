"use client";

import { useMemo, useRef, useState, type CSSProperties } from "react";

type MarkerPoint = {
  id: number;
  x: number;
  z: number;
};

type DayzMapProps = {
  image: string;
  worldSize: number;
  markers: MarkerPoint[];
  onAddPoint: (point: { x: number; z: number }) => void;
};

export default function DayzMap({
  image,
  worldSize,
  markers,
  onAddPoint,
}: DayzMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, ox: 0, oy: 0 });

  const clampedZoom = useMemo(() => {
    if (zoom < 1) return 1;
    if (zoom > 4) return 4;
    return zoom;
  }, [zoom]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    setZoom((prev) => {
      const next = prev + (e.deltaY < 0 ? 0.2 : -0.2);
      if (next < 1) return 1;
      if (next > 4) return 4;
      return Number(next.toFixed(2));
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      ox: offset.x,
      oy: offset.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    setOffset({
      x: dragStartRef.current.ox + dx,
      y: dragStartRef.current.oy + dy,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleReset = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) return;
    const rect = e.currentTarget.getBoundingClientRect();

    const localX = (e.clientX - rect.left - offset.x) / clampedZoom;
    const localY = (e.clientY - rect.top - offset.y) / clampedZoom;

    const relX = localX / rect.width;
    const relY = localY / rect.height;

    if (relX < 0 || relX > 1 || relY < 0 || relY > 1) return;

    const x = Math.round(relX * worldSize);
    const z = Math.round(relY * worldSize);

    onAddPoint({ x, z });
  };

  return (
    <section style={wrapperStyle}>
      <div style={toolbarStyle}>
        <div style={{ color: "#94a3b8" }}>
          Mausrad = Zoom · Karte ziehen = bewegen · Klick = Spawnpunkt setzen
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={() => setZoom((z) => Math.max(1, z - 0.2))} style={toolButtonStyle}>
            Zoom -
          </button>
          <button onClick={handleReset} style={toolButtonStyle}>
            Reset
          </button>
          <button onClick={() => setZoom((z) => Math.min(4, z + 0.2))} style={toolButtonStyle}>
            Zoom +
          </button>
        </div>
      </div>

      <div
        ref={mapRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleMapClick}
        style={viewportStyle}
      >
        <div
          style={{
            ...imageLayerStyle,
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${clampedZoom})`,
            backgroundImage: `url(${image})`,
            cursor: dragging ? "grabbing" : "crosshair",
          }}
        >
          {markers.map((marker, index) => (
            <div
              key={marker.id}
              title={`#${index + 1} | X: ${marker.x} | Z: ${marker.z}`}
              style={{
                ...markerStyle,
                left: `${(marker.x / worldSize) * 100}%`,
                top: `${(marker.z / worldSize) * 100}%`,
              }}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const wrapperStyle: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 24,
  padding: 16,
  background: "rgba(15,23,42,0.82)",
};

const toolbarStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
  marginBottom: 12,
};

const toolButtonStyle: CSSProperties = {
  border: "none",
  borderRadius: 10,
  padding: "10px 14px",
  background: "#1e293b",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};

const viewportStyle: CSSProperties = {
  height: 700,
  overflow: "hidden",
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "#020617",
  position: "relative",
  userSelect: "none",
};

const imageLayerStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  position: "relative",
  transformOrigin: "top left",
  backgroundSize: "100% 100%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

const markerStyle: CSSProperties = {
  position: "absolute",
  transform: "translate(-50%, -50%)",
  width: 22,
  height: 22,
  borderRadius: "999px",
  background: "#ef4444",
  border: "2px solid white",
  boxShadow: "0 0 12px rgba(239,68,68,.55)",
  display: "grid",
  placeItems: "center",
  color: "#fff",
  fontWeight: 800,
  fontSize: 10,
};