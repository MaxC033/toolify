"use client";

import { useState, useCallback } from "react";

interface ColorStop {
  color: string;
  position: number;
}

type GradientType = "linear" | "radial";

function generateCss(type: GradientType, angle: number, stops: ColorStop[]): string {
  const stopsStr = stops
    .map((s) => `${s.color} ${s.position}%`)
    .join(", ");
  if (type === "linear") {
    return `linear-gradient(${angle}deg, ${stopsStr})`;
  }
  return `radial-gradient(circle, ${stopsStr})`;
}

export default function CssGradientGenerator() {
  const [type, setType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<ColorStop[]>([
    { color: "#7c6eff", position: 0 },
    { color: "#e06cff", position: 100 },
  ]);
  const [copied, setCopied] = useState(false);

  const css = generateCss(type, angle, stops);
  const fullCss = `background: ${css};`;

  const updateStop = (i: number, field: keyof ColorStop, value: string | number) => {
    setStops((prev) => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  };

  const addStop = () => {
    if (stops.length >= 6) return;
    const pos = Math.round((stops[stops.length - 1].position + stops[0].position) / 2);
    setStops([...stops, { color: "#ffffff", position: Math.max(1, Math.min(99, pos + 10)) }]);
  };

  const removeStop = (i: number) => {
    if (stops.length <= 2) return;
    setStops(stops.filter((_, idx) => idx !== i));
  };

  const copy = async () => {
    await navigator.clipboard.writeText(fullCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const PRESETS = [
    { name: "Purple Dream", stops: [{ color: "#7c6eff", position: 0 }, { color: "#e06cff", position: 100 }] },
    { name: "Ocean", stops: [{ color: "#0ea5e9", position: 0 }, { color: "#2563eb", position: 100 }] },
    { name: "Sunset", stops: [{ color: "#f97316", position: 0 }, { color: "#ec4899", position: 100 }] },
    { name: "Forest", stops: [{ color: "#22c55e", position: 0 }, { color: "#14b8a6", position: 100 }] },
    { name: "Gold", stops: [{ color: "#fbbf24", position: 0 }, { color: "#f97316", position: 100 }] },
    { name: "Dark", stops: [{ color: "#1a1a24", position: 0 }, { color: "#2d2d42", position: 100 }] },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Type selector */}
      <div className="flex gap-3 items-center">
        {(["linear", "radial"] as const).map((t) => (
          <button
            key={t}
            className={`tag capitalize ${type === t ? "active" : ""}`}
            onClick={() => setType(t)}
            id={`gradient-type-${t}`}
          >
            {t}
          </button>
        ))}
        {type === "linear" && (
          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs text-[var(--text-muted)]">Angle:</span>
            <input
              type="number"
              min={0}
              max={360}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="input w-20 py-1.5"
              id="angle-input"
            />
            <span className="text-xs text-[var(--text-muted)]">°</span>
          </div>
        )}
      </div>

      {/* Preview */}
      <div
        className="w-full rounded-2xl border border-[var(--border)] cursor-pointer flex items-center justify-center text-sm text-white font-medium"
        style={{ background: css, height: 160 }}
        onClick={copy}
        title="Click to copy CSS"
      >
        {copied ? "✓ Copied!" : "Click to copy"}
      </div>

      {/* CSS output */}
      <div
        className="font-mono text-sm bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-4 py-3 flex items-center justify-between gap-3 cursor-pointer hover:border-[var(--accent)] transition-colors"
        onClick={copy}
        id="css-output"
      >
        <span className="text-[var(--accent)] truncate">{fullCss}</span>
        <button className="btn-primary flex-shrink-0 py-1.5">
          {copied ? "✓" : "Copy"}
        </button>
      </div>

      {/* Angle slider */}
      {type === "linear" && (
        <div>
          <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2 block">
            Direction: {angle}°
          </label>
          <input
            type="range"
            min={0}
            max={360}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full"
            id="angle-slider"
          />
        </div>
      )}

      {/* Color stops */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
            Color Stops
          </label>
          <button
            className="btn-secondary py-1 px-3 text-xs"
            onClick={addStop}
            disabled={stops.length >= 6}
            id="add-stop-btn"
          >
            + Add Stop
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {stops.map((stop, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                type="color"
                value={stop.color}
                onChange={(e) => updateStop(i, "color", e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border border-[var(--border)] bg-transparent"
                id={`color-stop-${i}`}
              />
              <span className="font-mono text-sm text-[var(--text-secondary)] w-20">
                {stop.color.toUpperCase()}
              </span>
              <input
                type="range"
                min={0}
                max={100}
                value={stop.position}
                onChange={(e) => updateStop(i, "position", Number(e.target.value))}
                className="flex-1"
                id={`position-${i}`}
              />
              <span className="text-xs text-[var(--text-muted)] w-10 text-right">
                {stop.position}%
              </span>
              {stops.length > 2 && (
                <button
                  className="text-[var(--text-muted)] hover:text-[var(--red)] transition-colors w-6 text-center"
                  onClick={() => removeStop(i)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Presets */}
      <div>
        <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-3 block">
          Presets
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              className="flex items-center gap-2 tag"
              onClick={() => setStops(preset.stops)}
              id={`preset-${preset.name.toLowerCase().replace(" ", "-")}`}
            >
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{
                  background: `linear-gradient(90deg, ${preset.stops[0].color}, ${preset.stops[preset.stops.length - 1].color})`,
                }}
              />
              {preset.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
