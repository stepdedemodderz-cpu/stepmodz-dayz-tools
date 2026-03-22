"use client";

import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";

type PosBubble = {
  id: number;
  x: string;
  z: string;
};

type SpawnGroup = {
  id: number;
  name: string;
  positions: PosBubble[];
};

type SpawnParams = {
  min_dist_infected: string;
  max_dist_infected: string;
  min_dist_player: string;
  max_dist_player: string;
  min_dist_static: string;
  max_dist_static: string;
};

type GeneratorParams = {
  grid_density: string;
  grid_width: string;
  grid_height: string;
  min_dist_static: string;
  max_dist_static: string;
  min_steepness: string;
  max_steepness: string;
};

type GroupParams = {
  enablegroups: boolean;
  groups_as_regular: boolean;
  lifetime: string;
  counter: string;
};

export default function SpawnpointsPage() {
  const [groups, setGroups] = useState<SpawnGroup[]>([
    {
      id: 1,
      name: "CustomGroup",
      positions: [],
    },
  ]);

  const [selectedGroupId, setSelectedGroupId] = useState<number>(1);
  const [groupNameInput, setGroupNameInput] = useState("CustomGroup");
  const [x, setX] = useState("");
  const [z, setZ] = useState("");

  const [spawnParams, setSpawnParams] = useState<SpawnParams>({
    min_dist_infected: "30",
    max_dist_infected: "70",
    min_dist_player: "65",
    max_dist_player: "150",
    min_dist_static: "0",
    max_dist_static: "2",
  });

  const [generatorParams, setGeneratorParams] = useState<GeneratorParams>({
    grid_density: "4",
    grid_width: "200",
    grid_height: "200",
    min_dist_static: "0",
    max_dist_static: "2",
    min_steepness: "-45",
    max_steepness: "45",
  });

  const [groupParams, setGroupParams] = useState<GroupParams>({
    enablegroups: true,
    groups_as_regular: true,
    lifetime: "240",
    counter: "-1",
  });

  const selectedGroup =
    groups.find((group) => group.id === selectedGroupId) ?? groups[0];

  const addGroup = () => {
    const trimmed = groupNameInput.trim();
    if (!trimmed) return;

    const newGroup: SpawnGroup = {
      id: Date.now(),
      name: trimmed,
      positions: [],
    };

    setGroups((prev) => [...prev, newGroup]);
    setSelectedGroupId(newGroup.id);
    setGroupNameInput("");
  };

  const removeGroup = (groupId: number) => {
    const updated = groups.filter((group) => group.id !== groupId);

    if (updated.length === 0) {
      const fallback: SpawnGroup = {
        id: Date.now(),
        name: "CustomGroup",
        positions: [],
      };
      setGroups([fallback]);
      setSelectedGroupId(fallback.id);
      setGroupNameInput(fallback.name);
      return;
    }

    setGroups(updated);
    setSelectedGroupId(updated[0].id);
    setGroupNameInput(updated[0].name);
  };

  const renameGroup = (groupId: number, newName: string) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId ? { ...group, name: newName } : group
      )
    );
  };

  const addPosBubble = () => {
    if (!selectedGroup || !x.trim() || !z.trim()) return;

    const newPos: PosBubble = {
      id: Date.now(),
      x: x.trim(),
      z: z.trim(),
    };

    setGroups((prev) =>
      prev.map((group) =>
        group.id === selectedGroup.id
          ? { ...group, positions: [...group.positions, newPos] }
          : group
      )
    );

    setX("");
    setZ("");
  };

  const removePosBubble = (groupId: number, posId: number) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              positions: group.positions.filter((pos) => pos.id !== posId),
            }
          : group
      )
    );
  };

  const xmlOutput = useMemo(() => {
    const groupsXml = groups
      .map((group) => {
        const positionsXml =
          group.positions.length > 0
            ? group.positions
                .map((pos) => `        <pos x="${pos.x}" z="${pos.z}" />`)
                .join("\n")
            : "";

        return `      <group name="${group.name}">
${positionsXml}
      </group>`;
      })
      .join("\n");

    return `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<playerspawnpoints>
  <fresh>
    <spawn_params>
      <min_dist_infected>${spawnParams.min_dist_infected}</min_dist_infected>
      <max_dist_infected>${spawnParams.max_dist_infected}</max_dist_infected>
      <min_dist_player>${spawnParams.min_dist_player}</min_dist_player>
      <max_dist_player>${spawnParams.max_dist_player}</max_dist_player>
      <min_dist_static>${spawnParams.min_dist_static}</min_dist_static>
      <max_dist_static>${spawnParams.max_dist_static}</max_dist_static>
    </spawn_params>

    <generator_params>
      <grid_density>${generatorParams.grid_density}</grid_density>
      <grid_width>${generatorParams.grid_width}</grid_width>
      <grid_height>${generatorParams.grid_height}</grid_height>
      <min_dist_static>${generatorParams.min_dist_static}</min_dist_static>
      <max_dist_static>${generatorParams.max_dist_static}</max_dist_static>
      <min_steepness>${generatorParams.min_steepness}</min_steepness>
      <max_steepness>${generatorParams.max_steepness}</max_steepness>
    </generator_params>

    <group_params>
      <enablegroups>${String(groupParams.enablegroups)}</enablegroups>
      <groups_as_regular>${String(groupParams.groups_as_regular)}</groups_as_regular>
      <lifetime>${groupParams.lifetime}</lifetime>
      <counter>${groupParams.counter}</counter>
    </group_params>

    <generator_posbubbles>
${groupsXml}
    </generator_posbubbles>
  </fresh>
</playerspawnpoints>`;
  }, [groups, spawnParams, generatorParams, groupParams]);

  const copyXml = async () => {
    try {
      await navigator.clipboard.writeText(xmlOutput);
      alert("XML kopiert");
    } catch {
      alert("Kopieren hat nicht funktioniert");
    }
  };

  const downloadXml = () => {
    const blob = new Blob([xmlOutput], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cfgplayerspawnpoints.xml";
    a.click();
    URL.revokeObjectURL(url);
  };

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
          href="/dashboard?lang=de"
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
          ← Zurück zum Dashboard
        </Link>

        <div
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 28,
            padding: 28,
            background: "rgba(15,23,42,0.82)",
            marginBottom: 24,
          }}
        >
          <h1 style={{ margin: 0, fontSize: 46, fontWeight: 900 }}>
            Playerspawnpoints Generator
          </h1>
          <p
            style={{
              marginTop: 12,
              color: "#94a3b8",
              fontSize: 17,
              lineHeight: 1.7,
            }}
          >
            Einfacher DayZ playerspawnpoints.xml Generator für Step Mod!Z.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 24,
            alignItems: "start",
          }}
        >
          <section style={cardStyle}>
            <h2 style={sectionTitleStyle}>Gruppen verwalten</h2>

            <div style={{ display: "grid", gap: 12 }}>
              <input
                value={groupNameInput}
                onChange={(e) => setGroupNameInput(e.target.value)}
                placeholder="Neuer Gruppenname"
                style={inputStyle}
              />
              <button onClick={addGroup} style={greenButtonStyle}>
                Gruppe hinzufügen
              </button>
            </div>

            <div style={{ marginTop: 20, display: "grid", gap: 12 }}>
              {groups.map((group) => (
                <div
                  key={group.id}
                  style={{
                    borderRadius: 16,
                    border:
                      group.id === selectedGroupId
                        ? "1px solid rgba(56,189,248,0.7)"
                        : "1px solid rgba(255,255,255,0.08)",
                    background: "#020617",
                    padding: 14,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      onClick={() => {
                        setSelectedGroupId(group.id);
                        setGroupNameInput(group.name);
                      }}
                      style={{
                        ...blueButtonStyle,
                        padding: "10px 12px",
                      }}
                    >
                      Auswählen
                    </button>

                    <input
                      value={group.name}
                      onChange={(e) => renameGroup(group.id, e.target.value)}
                      style={{ ...inputStyle, flex: 1, minWidth: 180 }}
                    />

                    <button
                      onClick={() => removeGroup(group.id)}
                      style={deleteButtonStyle}
                    >
                      Löschen
                    </button>
                  </div>

                  <div style={{ marginTop: 10, color: "#94a3b8" }}>
                    Pos-Bubbles: {group.positions.length}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section style={cardStyle}>
            <h2 style={sectionTitleStyle}>Pos-Bubble hinzufügen</h2>

            <div
              style={{
                marginBottom: 12,
                color: "#94a3b8",
              }}
            >
              Aktive Gruppe:{" "}
              <span style={{ color: "#fff", fontWeight: 700 }}>
                {selectedGroup?.name ?? "-"}
              </span>
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              <input
                value={x}
                onChange={(e) => setX(e.target.value)}
                placeholder="X Koordinate"
                style={inputStyle}
              />
              <input
                value={z}
                onChange={(e) => setZ(e.target.value)}
                placeholder="Z Koordinate"
                style={inputStyle}
              />
              <button onClick={addPosBubble} style={greenButtonStyle}>
                Pos-Bubble hinzufügen
              </button>
            </div>

            <div style={{ marginTop: 20, display: "grid", gap: 10 }}>
              {(selectedGroup?.positions ?? []).length === 0 ? (
                <p style={{ color: "#94a3b8" }}>
                  Noch keine Pos-Bubbles in dieser Gruppe.
                </p>
              ) : (
                selectedGroup.positions.map((pos, index) => (
                  <div
                    key={pos.id}
                    style={{
                      padding: 12,
                      borderRadius: 14,
                      background: "#020617",
                      border: "1px solid rgba(255,255,255,0.08)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div>
                      #{index + 1} — X: {pos.x} | Z: {pos.z}
                    </div>

                    <button
                      onClick={() => removePosBubble(selectedGroup.id, pos.id)}
                      style={deleteButtonStyle}
                    >
                      Löschen
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 24,
            marginTop: 24,
          }}
        >
          <section style={cardStyle}>
            <h2 style={sectionTitleStyle}>spawn_params</h2>
            <div style={{ display: "grid", gap: 10 }}>
              <input
                value={spawnParams.min_dist_infected}
                onChange={(e) =>
                  setSpawnParams((prev) => ({
                    ...prev,
                    min_dist_infected: e.target.value,
                  }))
                }
                placeholder="min_dist_infected"
                style={inputStyle}
              />
              <input
                value={spawnParams.max_dist_infected}
                onChange={(e) =>
                  setSpawnParams((prev) => ({
                    ...prev,
                    max_dist_infected: e.target.value,
                  }))
                }
                placeholder="max_dist_infected"
                style={inputStyle}
              />
              <input
                value={spawnParams.min_dist_player}
                onChange={(e) =>
                  setSpawnParams((prev) => ({
                    ...prev,
                    min_dist_player: e.target.value,
                  }))
                }
                placeholder="min_dist_player"
                style={inputStyle}
              />
              <input
                value={spawnParams.max_dist_player}
                onChange={(e) =>
                  setSpawnParams((prev) => ({
                    ...prev,
                    max_dist_player: e.target.value,
                  }))
                }
                placeholder="max_dist_player"
                style={inputStyle}
              />
              <input
                value={spawnParams.min_dist_static}
                onChange={(e) =>
                  setSpawnParams((prev) => ({
                    ...prev,
                    min_dist_static: e.target.value,
                  }))
                }
                placeholder="min_dist_static"
                style={inputStyle}
              />
              <input
                value={spawnParams.max_dist_static}
                onChange={(e) =>
                  setSpawnParams((prev) => ({
                    ...prev,
                    max_dist_static: e.target.value,
                  }))
                }
                placeholder="max_dist_static"
                style={inputStyle}
              />
            </div>
          </section>

          <section style={cardStyle}>
            <h2 style={sectionTitleStyle}>generator_params</h2>
            <div style={{ display: "grid", gap: 10 }}>
              <input
                value={generatorParams.grid_density}
                onChange={(e) =>
                  setGeneratorParams((prev) => ({
                    ...prev,
                    grid_density: e.target.value,
                  }))
                }
                placeholder="grid_density"
                style={inputStyle}
              />
              <input
                value={generatorParams.grid_width}
                onChange={(e) =>
                  setGeneratorParams((prev) => ({
                    ...prev,
                    grid_width: e.target.value,
                  }))
                }
                placeholder="grid_width"
                style={inputStyle}
              />
              <input
                value={generatorParams.grid_height}
                onChange={(e) =>
                  setGeneratorParams((prev) => ({
                    ...prev,
                    grid_height: e.target.value,
                  }))
                }
                placeholder="grid_height"
                style={inputStyle}
              />
              <input
                value={generatorParams.min_dist_static}
                onChange={(e) =>
                  setGeneratorParams((prev) => ({
                    ...prev,
                    min_dist_static: e.target.value,
                  }))
                }
                placeholder="min_dist_static"
                style={inputStyle}
              />
              <input
                value={generatorParams.max_dist_static}
                onChange={(e) =>
                  setGeneratorParams((prev) => ({
                    ...prev,
                    max_dist_static: e.target.value,
                  }))
                }
                placeholder="max_dist_static"
                style={inputStyle}
              />
              <input
                value={generatorParams.min_steepness}
                onChange={(e) =>
                  setGeneratorParams((prev) => ({
                    ...prev,
                    min_steepness: e.target.value,
                  }))
                }
                placeholder="min_steepness"
                style={inputStyle}
              />
              <input
                value={generatorParams.max_steepness}
                onChange={(e) =>
                  setGeneratorParams((prev) => ({
                    ...prev,
                    max_steepness: e.target.value,
                  }))
                }
                placeholder="max_steepness"
                style={inputStyle}
              />
            </div>
          </section>

          <section style={cardStyle}>
            <h2 style={sectionTitleStyle}>group_params</h2>
            <div style={{ display: "grid", gap: 12 }}>
              <label style={checkboxRowStyle}>
                <input
                  type="checkbox"
                  checked={groupParams.enablegroups}
                  onChange={(e) =>
                    setGroupParams((prev) => ({
                      ...prev,
                      enablegroups: e.target.checked,
                    }))
                  }
                />
                <span>enablegroups</span>
              </label>

              <label style={checkboxRowStyle}>
                <input
                  type="checkbox"
                  checked={groupParams.groups_as_regular}
                  onChange={(e) =>
                    setGroupParams((prev) => ({
                      ...prev,
                      groups_as_regular: e.target.checked,
                    }))
                  }
                />
                <span>groups_as_regular</span>
              </label>

              <input
                value={groupParams.lifetime}
                onChange={(e) =>
                  setGroupParams((prev) => ({
                    ...prev,
                    lifetime: e.target.value,
                  }))
                }
                placeholder="lifetime"
                style={inputStyle}
              />

              <input
                value={groupParams.counter}
                onChange={(e) =>
                  setGroupParams((prev) => ({
                    ...prev,
                    counter: e.target.value,
                  }))
                }
                placeholder="counter"
                style={inputStyle}
              />
            </div>
          </section>
        </div>

        <section
          style={{
            ...cardStyle,
            marginTop: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 18,
            }}
          >
            <h2 style={{ margin: 0 }}>DayZ XML Output</h2>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={copyXml} style={blueButtonStyle}>
                XML kopieren
              </button>
              <button onClick={downloadXml} style={greenButtonStyle}>
                XML downloaden
              </button>
            </div>
          </div>

          <textarea
            value={xmlOutput}
            readOnly
            rows={24}
            style={{
              width: "100%",
              borderRadius: 18,
              padding: 16,
              background: "#020617",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.08)",
              resize: "vertical",
              fontSize: 14,
              lineHeight: 1.6,
            }}
          />
        </section>
      </div>
    </main>
  );
}

const cardStyle: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 24,
  padding: 24,
  background: "rgba(15,23,42,0.82)",
};

const sectionTitleStyle: CSSProperties = {
  marginTop: 0,
  marginBottom: 16,
};

const inputStyle: CSSProperties = {
  padding: 14,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "#020617",
  color: "#fff",
  outline: "none",
  fontSize: 15,
};

const greenButtonStyle: CSSProperties = {
  border: "none",
  borderRadius: 14,
  padding: "14px 16px",
  background: "#22c55e",
  color: "#052e16",
  fontWeight: 800,
  cursor: "pointer",
};

const blueButtonStyle: CSSProperties = {
  border: "none",
  borderRadius: 14,
  padding: "14px 16px",
  background: "#38bdf8",
  color: "#082f49",
  fontWeight: 800,
  cursor: "pointer",
};

const deleteButtonStyle: CSSProperties = {
  border: "none",
  borderRadius: 10,
  padding: "8px 12px",
  background: "#ef4444",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};

const checkboxRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  color: "#fff",
};