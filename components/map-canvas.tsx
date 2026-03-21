"use client";

import { useMemo, useState } from "react";

type Marker = {
  id: number;
  x: number;
  z: number;
  label?: string;
};

export default function MapCanvas({
  image,
  worldSize,
  markers,
  onAddPoint,
}: {
  image: string;
  worldSize: number;
  markers: Marker[];
  onAddPoint: (point: { x: number; z: number }) => void;
}) {
  const [zoom, setZoom] = useState(1);

  const clampedZoom = useMemo(() => {
    if (zoom < 1) return 1;
    if (zoom > 3) return 3;
    return zoom;
  }, [zoom]);

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width;
    const relY = (event.clientY - rect.top) / rect.height;

    const x = Math.round(relX * worldSize);
    const z = Math.round(relY * worldSize);

    onAddPoint({ x, z });
  };

  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 24,
        padding: 16,
        background: "rgba(15,23,42,0.82)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 12,
        }}
      >
        <div style={{ color: "#94a3b8" }}>
          Klick auf die Karte, um einen Spawnpunkt zu setzen.
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => setZoom((prev) => Math.max(1, prev - 0.25))}
            style={zoomButtonStyle}
          >
            Zoom -
          </button>
          <button
            onClick={() => setZoom(1)}
            style={zoomButtonStyle}
          >
            Reset
          </button>
          <button
            onClick={() => setZoom((prev) => Math.min(3, prev + 0.25))}
            style={zoomButtonStyle}
          >
            Zoom +
          </button>
        </div>
      </div>

      <div
        style={{
          height: 640,
          overflow: "auto",
          borderRadius: 18,
          background: "#020617",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            width: `${100 * clampedZoom}%`,
            minWidth: "100%",
            aspectRatio: "1 / 1",
            position: "relative",
            cursor: "crosshair",
            backgroundImage: `url(${image})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          onClick={handleMapClick}
        >
          {markers.map((marker, index) => (
            <div
              key={marker.id}
              title={`${marker.label || "Spawnpunkt"} | X: ${marker.x} Z: ${marker.z}`}
              style={{
                position: "absolute",
                left: `${(marker.x / worldSize) * 100}%`,
                top: `${(marker.z / worldSize) * 100}%`,
                transform: "translate(-50%, -50%)",
                width: 18,
                height: 18,
                borderRadius: "999px",
                background: "#ef4444",
                border: "2px solid white",
                boxShadow: "0 0 12px rgba(239,68,68,0.55)",
                display: "grid",
                placeItems: "center",
                color: "#fff",
                fontSize: 10,
                fontWeight: 800,
              }}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const zoomButtonStyle: React.CSSProperties = {
  border: "none",
  borderRadius: 10,
  padding: "10px 14px",
  background: "#1e293b",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};