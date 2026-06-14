"use client";

import { useState } from "react";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export default function HexToRgb() {
  const [hex, setHex] = useState("#8b5cf6");
  const [rgbStr, setRgbStr] = useState("rgb(139, 92, 246)");
  const [hslStr, setHslStr] = useState("hsl(258, 91%, 66%)");

  const handleHexChange = (val: string) => {
    setHex(val);
    if (/^#?([a-f\d]{3}){1,2}$/i.test(val)) {
      const rgb = hexToRgb(val);
      if (rgb) {
        setRgbStr(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        setHslStr(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Color preview box */}
        <div
          className="w-full h-36 rounded-xl border border-[var(--border)] shadow-inner flex items-center justify-center transition-all duration-300"
          style={{ backgroundColor: hex }}
        >
          <span className="font-mono text-sm bg-black/60 text-white px-3 py-1 rounded-full backdrop-blur-xs select-all">
            {hex}
          </span>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider block mb-1">
              HEX Color Code
            </label>
            <input
              type="text"
              className="input w-full font-mono text-sm"
              placeholder="#8b5cf6"
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider block mb-1">
              RGB Format
            </label>
            <input
              type="text"
              className="input w-full font-mono text-sm bg-[var(--surface-2)]"
              readOnly
              value={rgbStr}
            />
          </div>

          <div>
            <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider block mb-1">
              HSL Format
            </label>
            <input
              type="text"
              className="input w-full font-mono text-sm bg-[var(--surface-2)]"
              readOnly
              value={hslStr}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
