import React, { useMemo, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Download, MapPin, RotateCcw, Trash2, Upload, Copy, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const MAPS = {
  chernarus: {
    name: "Chernarus",
    size: 15360,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    accent: "from-emerald-400/30 via-cyan-400/20 to-blue-500/20",
  },
  livonia: {
    name: "Livonia",
    size: 12800,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    accent: "from-lime-400/30 via-green-400/20 to-emerald-500/20",
  },
  sakhal: {
    name: "Sakhal",
    size: 12800,
    image:
      "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1600&q=80",
    accent: "from-sky-300/30 via-slate-200/20 to-indigo-500/20",
  },
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function buildXml(points) {
  return `<spawnpoints>\n${points
    .map(
      (p) =>
        `  <pos x="${p.x.toFixed(2)}" z="${p.z.toFixed(2)}"${p.y !== "" ? ` y="${Number(p.y).toFixed(2)}"` : ""} />`
    )
    .join("\n")}\n</spawnpoints>`;
}

function parseXml(xmlText) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, "text/xml");
  const nodes = [...doc.getElementsByTagName("pos")];
  return nodes.map((node, index) => ({
    id: crypto.randomUUID?.() || `${Date.now()}-${index}`,
    x: Number(node.getAttribute("x") || 0),
    z: Number(node.getAttribute("z") || 0),
    y: node.getAttribute("y") || "",
  }));
}

export default function DayZSpawnpointGeneratorAltStyle() {
  const [selectedMap, setSelectedMap] = useState("chernarus");
  const [points, setPoints] = useState([]);
  const [manualY, setManualY] = useState("");
  const [xmlInput, setXmlInput] = useState("");
  const [copied, setCopied] = useState(false);
  const mapRef = useRef(null);

  const map = MAPS[selectedMap];
  const xmlOutput = useMemo(() => buildXml(points), [points]);

  const addPoint = (event) => {
    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect) return;

    const relX = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const relY = clamp((event.clientY - rect.top) / rect.height, 0, 1);

    const x = relX * map.size;
    const z = relY * map.size;

    setPoints((prev) => [
      ...prev,
      {
        id: crypto.randomUUID?.() || `${Date.now()}-${prev.length}`,
        x,
        z,
        y: manualY.trim(),
      },
    ]);
  };

  const removePoint = (id) => setPoints((prev) => prev.filter((p) => p.id !== id));
  const clearPoints = () => setPoints([]);

  const copyXml = async () => {
    try {
      await navigator.clipboard.writeText(xmlOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const downloadXml = () => {
    const blob = new Blob([xmlOutput], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedMap}-spawnpoints.xml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importXml = () => {
    try {
      const imported = parseXml(xmlInput);
      setPoints(imported);
    } catch {
      alert("XML konnte nicht gelesen werden.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.12),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <Badge className="mb-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-cyan-200">
              <Sparkles className="mr-2 h-3.5 w-3.5" /> Modern Alternative UI
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">DayZ Spawnpoint Generator</h1>
            <p className="mt-3 max-w-2xl text-slate-300">
              Gleiches Grundprinzip wie klassische Spawnpoint-Tools: Karte wählen, Punkte setzen,
              Liste verwalten und am Ende XML exportieren — aber in einem deutlich moderneren Stil.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="border-slate-700 bg-slate-900/70" onClick={clearPoints}>
              <RotateCcw className="mr-2 h-4 w-4" /> Alles löschen
            </Button>
            <Button onClick={downloadXml} className="rounded-2xl">
              <Download className="mr-2 h-4 w-4" /> XML herunterladen
            </Button>
          </div>
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-[1.45fr_0.75fr]">
          <Card className="overflow-hidden rounded-3xl border-slate-800 bg-slate-900/70 backdrop-blur">
            <CardHeader className="pb-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <CardTitle className="text-2xl">Map Editor</CardTitle>
                  <CardDescription>
                    Klicke auf die Karte, um Spawnpunkte zu setzen. Die Position wird direkt in X/Z umgerechnet.
                  </CardDescription>
                </div>
                <Tabs value={selectedMap} onValueChange={setSelectedMap}>
                  <TabsList className="grid w-full grid-cols-3 bg-slate-800/80 lg:w-[360px]">
                    {Object.entries(MAPS).map(([key, value]) => (
                      <TabsTrigger key={key} value={key}>
                        {value.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                <div className="w-full sm:w-52">
                  <label className="mb-2 block text-sm text-slate-400">Optionaler Y-Wert</label>
                  <Input
                    value={manualY}
                    onChange={(e) => setManualY(e.target.value)}
                    placeholder="z. B. 12.50"
                    className="border-slate-700 bg-slate-950/70"
                  />
                </div>
                <div className="text-sm text-slate-400 sm:pt-7">
                  Kartengröße: <span className="font-medium text-slate-200">{map.size} x {map.size}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div
                ref={mapRef}
                onClick={addPoint}
                className={`relative aspect-[16/10] cursor-crosshair overflow-hidden rounded-[28px] border border-slate-700 bg-gradient-to-br ${map.accent}`}
              >
                <img src={map.image} alt={map.name} className="absolute inset-0 h-full w-full object-cover opacity-45" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:48px_48px]" />
                <div className="absolute left-4 top-4 rounded-2xl border border-white/10 bg-slate-950/65 px-4 py-2 text-sm backdrop-blur">
                  <div className="font-medium">{map.name}</div>
                  <div className="text-slate-400">{points.length} Spawnpunkte gesetzt</div>
                </div>

                {points.map((point, index) => {
                  const left = `${(point.x / map.size) * 100}%`;
                  const top = `${(point.z / map.size) * 100}%`;
                  return (
                    <motion.div
                      key={point.id}
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      style={{ left, top }}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-cyan-400/90 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/30">
                        {index + 1}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card className="rounded-3xl border-slate-800 bg-slate-900/70 backdrop-blur">
              <CardHeader>
                <CardTitle>Spawn Points</CardTitle>
                <CardDescription>Verwalte alle gesetzten Positionen und entferne einzelne Einträge.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[320px] pr-3">
                  <div className="space-y-3">
                    {points.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-slate-700 p-6 text-center text-sm text-slate-400">
                        Noch keine Spawnpunkte vorhanden.
                      </div>
                    ) : (
                      points.map((point, index) => (
                        <div key={point.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                          <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-2 font-medium">
                              <MapPin className="h-4 w-4 text-cyan-300" /> Punkt {index + 1}
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removePoint(point.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div className="rounded-xl bg-slate-900 p-2"><span className="text-slate-400">X</span><div>{point.x.toFixed(2)}</div></div>
                            <div className="rounded-xl bg-slate-900 p-2"><span className="text-slate-400">Z</span><div>{point.z.toFixed(2)}</div></div>
                            <div className="rounded-xl bg-slate-900 p-2"><span className="text-slate-400">Y</span><div>{point.y === "" ? "—" : point.y}</div></div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-slate-800 bg-slate-900/70 backdrop-blur">
              <CardHeader>
                <CardTitle>XML Export / Import</CardTitle>
                <CardDescription>XML kopieren, herunterladen oder bestehende Daten importieren.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button onClick={copyXml} variant="outline" className="border-slate-700 bg-slate-950/70">
                    <Copy className="mr-2 h-4 w-4" /> {copied ? "Kopiert" : "XML kopieren"}
                  </Button>
                  <Button onClick={downloadXml}>
                    <Download className="mr-2 h-4 w-4" /> Exportieren
                  </Button>
                </div>
                <Textarea value={xmlOutput} readOnly className="min-h-[160px] border-slate-700 bg-slate-950/70 font-mono text-xs" />
                <Separator className="bg-slate-800" />
                <Textarea
                  value={xmlInput}
                  onChange={(e) => setXmlInput(e.target.value)}
                  placeholder="Hier vorhandenes XML einfügen..."
                  className="min-h-[140px] border-slate-700 bg-slate-950/70 font-mono text-xs"
                />
                <Button onClick={importXml} variant="secondary">
                  <Upload className="mr-2 h-4 w-4" /> XML importieren
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
