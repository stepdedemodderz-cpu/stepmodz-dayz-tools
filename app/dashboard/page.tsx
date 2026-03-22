import Link from "next/link";

type DashboardPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

const content = {
  de: {
    back: "Zur Startseite",
    title: "Step Mod!Z Dashboard",
    subtitle:
      "Willkommen im DayZ Console Server Tool-Portal von StepDede_ModderZ.",
    sectionTools: "Verfügbare Tools",
    sectionSoon: "Weitere Tools in Planung",

    spawnTitle: "Playerspawnpoints Generator",
    spawnText:
      "Erstelle, bearbeite und exportiere playerspawnpoints.xml Dateien für deinen DayZ Server.",
    openTool: "Tool öffnen",

    mapTitle: "Map System",
    mapText:
      "Chernarus, Livonia und Sakhal sind vorbereitet und werden Schritt für Schritt eingebunden.",

    adminTitle: "Server Utilities",
    adminText:
      "Später können wir hier weitere Server-Tools einbauen, zum Beispiel Event-, Trader- oder Economy-Generatoren.",

    soon1: "Loadout Generator",
    soon1Text:
      "Erstelle Ausrüstungen und Start-Loadouts für Events oder Spawn-Systeme.",

    soon2: "Event / Zone Tools",
    soon2Text:
      "Zonen, Eventspawns, Marker und weitere Admin-Werkzeuge für deinen Server.",

    soon3: "Discord Integration",
    soon3Text:
      "Später kann daraus auch dein eigener Discord-Bot für Step Mod!Z entstehen.",

    creator: "Projekt von StepDede_ModderZ",
  },
  en: {
    back: "Back to home",
    title: "Step Mod!Z Dashboard",
    subtitle:
      "Welcome to the DayZ Console Server tool portal by StepDede_ModderZ.",
    sectionTools: "Available tools",
    sectionSoon: "More tools planned",

    spawnTitle: "Playerspawnpoints Generator",
    spawnText:
      "Create, edit and export playerspawnpoints.xml files for your DayZ server.",
    openTool: "Open tool",

    mapTitle: "Map System",
    mapText:
      "Chernarus, Livonia and Sakhal are prepared and will be integrated step by step.",

    adminTitle: "Server Utilities",
    adminText:
      "Later we can add more server tools here, for example event, trader or economy generators.",

    soon1: "Loadout Generator",
    soon1Text:
      "Create equipment and starting loadouts for events or spawn systems.",

    soon2: "Event / Zone Tools",
    soon2Text:
      "Zones, event spawns, markers and more admin utilities for your server.",

    soon3: "Discord Integration",
    soon3Text:
      "Later this can also become your own Discord bot for Step Mod!Z.",

    creator: "Project by StepDede_ModderZ",
  },
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = (await searchParams) ?? {};
  const lang = params.lang === "en" ? "en" : "de";
  const t = content[lang];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #020617 0%, #0f172a 100%)",
        color: "#fff",
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <Link
          href="/"
          style={{
            display: "inline-block",
            marginBottom: 20,
            padding: "12px 18px",
            borderRadius: 14,
            background: "#1e293b",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          ← {t.back}
        </Link>

        <section
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 28,
            padding: 30,
            background: "rgba(15,23,42,0.82)",
            marginBottom: 26,
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#22c55e",
              fontWeight: 800,
              letterSpacing: 0.6,
              textTransform: "uppercase",
              fontSize: 13,
            }}
          >
            {t.creator}
          </p>

          <h1
            style={{
              margin: "10px 0 0",
              fontSize: "clamp(34px, 5vw, 56px)",
              fontWeight: 900,
            }}
          >
            {t.title}
          </h1>

          <p
            style={{
              marginTop: 14,
              color: "#94a3b8",
              fontSize: 17,
              lineHeight: 1.7,
              maxWidth: 900,
            }}
          >
            {t.subtitle}
          </p>
        </section>

        <section style={{ marginBottom: 18 }}>
          <h2 style={{ marginBottom: 18 }}>{t.sectionTools}</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 22,
            }}
          >
            <article style={cardStyle}>
              <div style={greenBadgeStyle}>Live</div>
              <h3 style={cardTitleStyle}>{t.spawnTitle}</h3>
              <p style={cardTextStyle}>{t.spawnText}</p>
              <Link
                href={`/tools/spawnpoints?lang=${lang}`}
                style={greenLinkStyle}
              >
                {t.openTool}
              </Link>
            </article>

            <article style={cardStyle}>
              <div style={blueBadgeStyle}>Maps</div>
              <h3 style={cardTitleStyle}>{t.mapTitle}</h3>
              <p style={cardTextStyle}>{t.mapText}</p>

              <div
                style={{
                  marginTop: 14,
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <span style={pillStyle}>Chernarus</span>
                <span style={pillStyle}>Livonia</span>
                <span style={pillStyle}>Sakhal</span>
              </div>
            </article>

            <article style={cardStyle}>
              <div style={orangeBadgeStyle}>Next</div>
              <h3 style={cardTitleStyle}>{t.adminTitle}</h3>
              <p style={cardTextStyle}>{t.adminText}</p>
            </article>
          </div>
        </section>

        <section style={{ marginTop: 34 }}>
          <h2 style={{ marginBottom: 18 }}>{t.sectionSoon}</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 22,
            }}
          >
            <article style={cardStyle}>
              <div style={darkBadgeStyle}>Soon</div>
              <h3 style={cardTitleStyle}>{t.soon1}</h3>
              <p style={cardTextStyle}>{t.soon1Text}</p>
            </article>

            <article style={cardStyle}>
              <div style={darkBadgeStyle}>Soon</div>
              <h3 style={cardTitleStyle}>{t.soon2}</h3>
              <p style={cardTextStyle}>{t.soon2Text}</p>
            </article>

            <article style={cardStyle}>
              <div style={darkBadgeStyle}>Later</div>
              <h3 style={cardTitleStyle}>{t.soon3}</h3>
              <p style={cardTextStyle}>{t.soon3Text}</p>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}

const cardStyle: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 24,
  padding: 24,
  background: "rgba(15,23,42,0.82)",
  boxShadow: "0 14px 40px rgba(0,0,0,0.18)",
};

const cardTitleStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: 12,
  fontSize: 26,
};

const cardTextStyle: React.CSSProperties = {
  color: "#94a3b8",
  lineHeight: 1.7,
  marginBottom: 0,
};

const greenLinkStyle: React.CSSProperties = {
  display: "inline-block",
  marginTop: 18,
  padding: "12px 18px",
  borderRadius: 14,
  background: "#22c55e",
  color: "#052e16",
  textDecoration: "none",
  fontWeight: 900,
};

const greenBadgeStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "7px 12px",
  borderRadius: 999,
  background: "rgba(34,197,94,0.16)",
  color: "#86efac",
  fontWeight: 800,
  marginBottom: 16,
};

const blueBadgeStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "7px 12px",
  borderRadius: 999,
  background: "rgba(56,189,248,0.16)",
  color: "#7dd3fc",
  fontWeight: 800,
  marginBottom: 16,
};

const orangeBadgeStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "7px 12px",
  borderRadius: 999,
  background: "rgba(249,115,22,0.16)",
  color: "#fdba74",
  fontWeight: 800,
  marginBottom: 16,
};

const darkBadgeStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "7px 12px",
  borderRadius: 999,
  background: "rgba(148,163,184,0.15)",
  color: "#cbd5e1",
  fontWeight: 800,
  marginBottom: 16,
};

const pillStyle: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: 999,
  background: "#020617",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#cbd5e1",
  fontWeight: 700,
  fontSize: 14,
};