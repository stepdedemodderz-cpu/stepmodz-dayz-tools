"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background:
          "linear-gradient(180deg, #020617 0%, #0f172a 100%)",
        color: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1100,
          borderRadius: 30,
          border: "1px solid rgba(255,255,255,0.1)",
          padding: 40,
          textAlign: "center",
        }}
      >
        {/* LOGO */}
        <Image
          src="/logo.png"
          alt="Step ModZ Logo"
          width={300}
          height={300}
          style={{ marginBottom: 20 }}
        />

        {/* TITLE */}
        <h1 style={{ fontSize: 48, fontWeight: 900 }}>
          Step ModZ Center
        </h1>

        {/* SUBTEXT */}
        <p style={{ marginTop: 10, color: "#94a3b8" }}>
          Free DayZ Mods & Console Server Tools
        </p>

        {/* BUTTON */}
        <Link href="/dashboard">
          <button
            style={{
              marginTop: 30,
              padding: "16px 28px",
              borderRadius: 12,
              border: "none",
              background: "#22c55e",
              color: "#022c22",
              fontWeight: 800,
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            Step ModZ Bot → Dashboard
          </button>
        </Link>
      </div>
    </main>
  );
}