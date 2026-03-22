"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";

type Lang = "de" | "en";

const text = {
  de: {
    chooseLanguage: "Sprache auswählen",
    german: "Deutsch",
    english: "Englisch",
    title: "Step Mod!Z",
    subtitle: "DayZ Console Server Tools Portal",
    description:
      "Willkommen bei deinem Tool-Portal von StepDede_ModderZ. Wähle zuerst deine Sprache und öffne dann das Dashboard.",
    enter: "Step Mod!Z BOT",
    creator: "Erstellt von StepDede_ModderZ",
  },
  en: {
    chooseLanguage: "Choose language",
    german: "German",
    english: "English",
    title: "Step Mod!Z",
    subtitle: "DayZ Console Server Tools Portal",
    description:
      "Welcome to your tool portal by StepDede_ModderZ. First choose your language and then open the dashboard.",
    enter: "Step Mod!Z BOT",
    creator: "Created by StepDede_ModderZ",
  },
};

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("de");
  const t = useMemo(() => text[lang], [lang]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #020617 0%, #0f172a 100%)",
        color: "#fff",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 32,
          background: "rgba(15,23,42,0.82)",
          padding: 32,
          boxShadow: "0 20px 80px rgba(0,0,0,0.35)",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <Image
            src="/logo.png"
            alt="Step Mod!Z Logo"
            width={220}
            height={220}
            style={{
              width: "min(220px, 60vw)",
              height: "auto",
              margin: "0 auto",
            }}
            priority
          />
        </div>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: 10,
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          {t.chooseLanguage}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 28,
          }}
        >
          <button
            onClick={() => setLang("de")}
            style={{
              ...langButtonStyle,
              background: lang === "de" ? "#22c55e" : "#1e293b",
              color: lang === "de" ? "#052e16" : "#fff",
            }}
          >
            {text.de.german}
          </button>

          <button
            onClick={() => setLang("en")}
            style={{
              ...langButtonStyle,
              background: lang === "en" ? "#38bdf8" : "#1e293b",
              color: lang === "en" ? "#082f49" : "#fff",
            }}
          >
            {text.en.english}
          </button>
        </div>

        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 68px)",
            margin: 0,
            fontWeight: 900,
          }}
        >
          {t.title}
        </h1>

        <p
          style={{
            marginTop: 10,
            fontSize: 20,
            color: "#e2e8f0",
            fontWeight: 700,
          }}
        >
          {t.subtitle}
        </p>

        <p
          style={{
            maxWidth: 720,
            margin: "18px auto 0",
            color: "#94a3b8",
            lineHeight: 1.8,
            fontSize: 16,
          }}
        >
          {t.description}
        </p>

        <div style={{ marginTop: 30 }}>
          <Link
            href={`/dashboard?lang=${lang}`}
            style={{
              display: "inline-block",
              padding: "16px 28px",
              borderRadius: 16,
              background: "#22c55e",
              color: "#052e16",
              textDecoration: "none",
              fontWeight: 900,
              fontSize: 18,
              boxShadow: "0 10px 30px rgba(34,197,94,0.25)",
            }}
          >
            {t.enter}
          </Link>
        </div>

        <p
          style={{
            marginTop: 24,
            color: "#64748b",
            fontSize: 14,
          }}
        >
          {t.creator}
        </p>
      </div>
    </main>
  );
}

const langButtonStyle: React.CSSProperties = {
  border: "none",
  borderRadius: 14,
  padding: "12px 18px",
  fontWeight: 800,
  cursor: "pointer",
  minWidth: 140,
};