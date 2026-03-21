export default function DashboardPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: 24,
        background: "linear-gradient(180deg, #020617 0%, #0f172a 100%)",
        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <a
          href="/"
          style={{
            display: "inline-block",
            marginBottom: 24,
            padding: "12px 18px",
            borderRadius: 12,
            background: "#1e293b",
            color: "white",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          ← Zur Startseite
        </a>

        <div
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 24,
            padding: 30,
            background: "rgba(15,23,42,0.75)",
          }}
        >
          <h1 style={{ fontSize: 42, margin: 0 }}>Dashboard</h1>
          <p style={{ color: "#94a3b8", marginTop: 12, fontSize: 18 }}>
            Hier kommen deine DayZ Console Server Tools rein.
          </p>
        </div>

        <div
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              padding: 24,
              background: "rgba(15,23,42,0.75)",
            }}
          >
            <div
              style={{
                display: "inline-block",
                marginBottom: 12,
                padding: "6px 12px",
                borderRadius: 999,
                background: "rgba(34,197,94,0.15)",
                color: "#86efac",
                fontWeight: 700,
              }}
            >
              Tool 01
            </div>

            <h2 style={{ margin: 0, fontSize: 26 }}>
              Playerspawnpoints.xml Generator
            </h2>

            <p style={{ color: "#94a3b8", lineHeight: 1.7, marginTop: 12 }}>
              Als nächstes bauen wir hier deinen Generator für DayZ Spawnpoints ein.
            </p>
            <a
            href="/tools/spawnpoints"
            style={{
              display: "inline-block",
              marginTop: 12,
              padding: "10px 16px",
              borderRadius: 10,
              background: "#22c55e",
              color: "#022c22",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Tool öffnen
          </a>
          </div>
        </div>
      </div>
    </main>
  );
}