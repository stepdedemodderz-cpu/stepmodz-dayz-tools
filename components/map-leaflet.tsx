"use client";

import L from "leaflet";
import { ImageOverlay, MapContainer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type MarkerPoint = {
  id: number;
  x: number;
  z: number;
};

function ClickHandler({
  worldSize,
  onAddPoint,
}: {
  worldSize: number;
  onAddPoint: (point: { x: number; z: number }) => void;
}) {
  useMapEvents({
    click(e) {
      const x = Math.round(Math.max(0, Math.min(worldSize, e.latlng.lng)));
      const z = Math.round(Math.max(0, Math.min(worldSize, e.latlng.lat)));
      onAddPoint({ x, z });
    },
  });

  return null;
}

const markerIcon = L.divIcon({
  className: "dayz-marker",
  html: `
    <div style="
      width:18px;
      height:18px;
      border-radius:999px;
      background:#ef4444;
      border:2px solid white;
      box-shadow:0 0 12px rgba(239,68,68,.55);
    "></div>
  `,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

export default function MapLeaflet({
  image,
  worldSize,
  markers,
  onAddPoint,
}: {
  image: string;
  worldSize: number;
  markers: MarkerPoint[];
  onAddPoint: (point: { x: number; z: number }) => void;
}) {
  const bounds: L.LatLngBoundsExpression = [
    [0, 0],
    [worldSize, worldSize],
  ];

  const center: [number, number] = [worldSize / 2, worldSize / 2];

  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 24,
        padding: 16,
        background: "rgba(15,23,42,0.82)",
      }}
    >
      <div style={{ marginBottom: 12, color: "#94a3b8" }}>
        Mausrad = Zoom · Karte ziehen = bewegen · Klick = Spawnpunkt setzen
      </div>

      <div
        style={{
          borderRadius: 18,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <MapContainer
          center={center}
          zoom={0}
          minZoom={-2}
          maxZoom={4}
          crs={L.CRS.Simple}
          maxBounds={bounds}
          maxBoundsViscosity={1}
          scrollWheelZoom={true}
          doubleClickZoom={true}
          attributionControl={false}
          zoomControl={true}
          preferCanvas={true}
          style={{
            height: 700,
            width: "100%",
            background: "#020617",
          }}
        >
          <ImageOverlay url={image} bounds={bounds} />
          <ClickHandler worldSize={worldSize} onAddPoint={onAddPoint} />

          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.z, marker.x]}
              icon={markerIcon}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
}