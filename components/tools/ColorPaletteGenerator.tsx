"use client";

import { useState, useCallback } from "react";

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function generatePalette(baseHue: number, type: string): string[] {
  const s = 65, l = 55;
  switch (type) {
    case "complementary":
      return [0, 30, 180, 210, 330].map((d) => hslToHex((baseHue + d) % 360, s, l));
    case "triadic":
      return [0, 30, 120, 150, 240].map((d) => hslToHex((baseHue + d) % 360, s, l));
    case "analogous":
      return [-60, -30, 0, 30, 60].map((d) => hslToHex((baseHue + d + 360) % 360, s, l));
    case "monochromatic":
      return [20, 35, 50, 65, 80].map((lightness) => hslToHex(baseHue, s, lightness));
    default:
      return Array.from({ length: 5 }, () =>
        hslToHex(Math.floor(Math.random() * 360), 60 + Math.random() * 20, 45 + Math.random() * 20)
      );
  }
}

const TYPES = ["complementary", "triadic", "analogous", "monochromatic", "random"];

export default function ColorPaletteGenerator() {
  const [type, setType] = useState("complementary");
  const [baseHue, setBaseHue] = useState(Math.floor(Math.random() * 360));
  const [palette, setPalette] = useState(() => generatePalette(baseHue, "complementary"));
  const [copied, setCopied] = useState<string | null>(null);

  const generate = useCallback(() => {
    const hue = type === "random" ? Math.floor(Math.random() * 360) : baseHue;
    if (type === "random") setBaseHue(hue);
    setPalette(generatePalette(hue, type));
  }, [type, baseHue]);

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[180px]">
          <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2 block">
            Scheme Type
          </label>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t}
                className={`tag capitalize ${type === t ? "active" : ""}`}
                onClick={() => {
                  setType(t);
                  setPalette(generatePalette(baseHue, t));
                }}
                id={`scheme-${t}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        {type !== "random" && (
          <div>
            <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2 block">
              Base Hue: <span className="text-[var(--accent)]">{baseHue}°</span>
            </label>
            <input
              type="range"
              min={0}
              max={359}
              value={baseHue}
              onChange={(e) => {
                const h = Number(e.target.value);
                setBaseHue(h);
                setPalette(generatePalette(h, type));
              }}
              className="w-full"
              style={{ width: 200 }}
              id="base-hue-slider"
            />
          </div>
        )}
      </div>

      {/* Palette display */}
      <div className="flex flex-col md:flex-row gap-3 h-auto md:h-56">
        {palette.map((hex, i) => {
          const { r, g, b } = hexToRgb(hex);
          const isLight = (r * 299 + g * 587 + b * 114) / 1000 > 128;
          return (
            <div
              key={i}
              className="flex-1 rounded-2xl flex flex-col justify-end p-4 cursor-pointer transition-transform hover:scale-105 relative group min-h-[80px]"
              style={{ background: hex }}
              onClick={() => copy(hex)}
            >
              {copied === hex && (
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-2xl"
                  style={{ background: "rgba(0,0,0,0.4)" }}
                >
                  <span className="text-white font-bold text-sm">✓ Copied!</span>
                </div>
              )}
              <div
                className="text-xs font-bold font-mono"
                style={{ color: isLight ? "#000" : "#fff" }}
              >
                {hex.toUpperCase()}
              </div>
              <div
                className="text-xs opacity-70 font-mono"
                style={{ color: isLight ? "#000" : "#fff" }}
              >
                {r},{g},{b}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <button className="btn-primary" onClick={generate} id="generate-palette-btn">
          🎲 Generate New
        </button>
        <button
          className="btn-secondary"
          onClick={() => copy(JSON.stringify(palette))}
          id="copy-json-btn"
        >
          {copied === JSON.stringify(palette) ? "✓ Copied!" : "Copy as JSON"}
        </button>
        <button
          className="btn-secondary"
          onClick={() => copy(palette.join(", "))}
          id="copy-css-btn"
        >
          Copy as CSS list
        </button>
      </div>

      <p className="text-xs text-[var(--text-muted)]">
        Click any color swatch to copy its HEX code.
      </p>
    </div>
  );
}
