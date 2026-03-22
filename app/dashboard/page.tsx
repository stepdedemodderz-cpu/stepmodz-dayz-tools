import Link from "next/link";

type DashboardPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

const content = {
  de: {
    back: "Zur Startseite",
    title: "Dashboard",
    subtitle:
      "Willkommen im Step Mod!Z Tool-Portal von StepDede_ModderZ.",
    toolsTitle: "Verfügbare Tools",
    spawnTitle: "Playerspawnpoints Generator",
    spawnText:
      "Erstelle und exportiere DayZ playerspawnpoints.xml Dateien für deinen Server.",
    openTool: "Tool öffnen",
    moreSoon: "Weitere Tools folgen bald",
    moreSoonText:
      "Als Nächstes können wir weitere DayZ Server Tools direkt in dieses Portal einbauen.",
  },
  en: {
    back: "Back to home",
    title: "Dashboard",
    subtitle: "Welcome to the Step Mod!Z tool portal by StepDede_ModderZ.",
    toolsTitle: "Available Tools",
    spawnTitle: "Playerspawnpoints Generator",
    spawnText:
      "Create and export DayZ playerspawnpoints.xml files for your server.",
    openTool: "Open tool",
    moreSoon: "More tools coming soon",
    moreSoonText:
      "Next we can add more DayZ server tools directly into this portal.",
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
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
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
            padding: 28,
            background: "rgba(15,23,42,0.82)",
            marginBottom: 24,
          }}
        >
          <h1 style={{ margin: 0, fontSize: 52, fontWeight: 900 }}>
            {t.title}
          </h1>
          <p
            style={{
              marginTop: 12,
              color: "#94a3b8",
              fontSize: 17,
              lineHeight: 1.7,
            }}
          >
            {t.subtitle}
          </p>
        </section>

        <h2 style={{ marginTop: 0, marginBottom: 18 }}>{t.toolsTitle}</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
          <article style={cardStyle}>
            <div style={badgeStyle}>Tool 01</div>
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
            <div style={badgeStyle}>Next</div>
            <h3 style={cardTitleStyle}>{t.moreSoon}</h3>
            <p style={cardTextStyle}>{t.moreSoonText}</p>
          </article>
        </div>
      </div>
    </main>
  );
}

const cardStyle: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 24,
  padding: 24,
  background: "rgba(15,23,42,0.82)",
};

const badgeStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "8px 12px",
  borderRadius: 999,
  background: "rgba(34,197,94,0.18)",
  color: "#86efac",
  fontWeight: 800,
  marginBottom: 16,
};

const cardTitleStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: 12,
  fontSize: 28,
};

const cardTextStyle: React.CSSProperties = {
  color: "#94a3b8",
  lineHeight: 1.7,
  marginBottom: 20,
};

const greenLinkStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "12px 18px",
  borderRadius: 14,
  background: "#22c55e",
  color: "#052e16",
  textDecoration: "none",
  fontWeight: 900,
};