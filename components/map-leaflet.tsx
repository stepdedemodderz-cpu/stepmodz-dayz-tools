"use client";

import { MapContainer, ImageOverlay, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Point = { x: number; y: number };

function ClickHandler({ onAdd }: { onAdd: (p: Point) => void }) {
  useMapEvents({
    click(e) {
      onAdd({ x: e.latlng.lng, y: e.latlng.lat });
    },
  });
  return null;
}

export default function MapLeaflet({
  image,
  points,
  onAddPoint,
}: {
  image: string;
  points: Point[];
  onAddPoint: (p: Point) => void;
}) {
  const bounds: any = [
    [0, 0],
    [10000, 10000],
  ];

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      style={{ height: "500px", width: "100%" }}
      zoomControl={true}
      scrollWheelZoom={true}
  preferCanvas={true}
    >
      <ImageOverlay url={image} bounds={bounds} />

      <ClickHandler onAdd={onAddPoint} />

      {points.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
          }}
        />
      ))}
    </MapContainer>
  );
}