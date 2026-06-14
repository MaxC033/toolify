"use client";

import { useState } from "react";

function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "") // remove comments
    .replace(/\s+/g, " ")             // collapse spaces
    .replace(/\s*([{};:,])\s*/g, "$1") // remove spaces around symbols
    .replace(/;}/g, "}")              // remove trailing semicolons
    .trim();
}

export default function CssMinifier() {
  const [css, setCss] = useState("");
  const [minified, setMinified] = useState("");
  const [copied, setCopied] = useState(false);

  const handleMinify = () => {
    setMinified(minifyCSS(css));
  };

  const handleCopy = () => {
    if (!minified) return;
    navigator.clipboard.writeText(minified);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <textarea
        className="input w-full font-mono text-sm"
        rows={8}
        placeholder="Paste your uncompressed CSS here…"
        value={css}
        onChange={(e) => setCss(e.target.value)}
      />

      <div className="flex gap-3">
        <button className="btn" onClick={handleMinify}>
          Minify CSS
        </button>
        {minified && (
          <>
            <button className="btn-secondary" onClick={handleCopy}>
              {copied ? "Copied! ✓" : "Copy to Clipboard"}
            </button>
            <button className="btn-secondary text-red-500" onClick={() => { setCss(""); setMinified(""); }}>
              Clear
            </button>
          </>
        )}
      </div>

      {minified && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider block">
              Minified CSS
            </label>
            <span className="text-xs text-[var(--text-muted)]">
              Shrunk by {((1 - minified.length / (css.length || 1)) * 100).toFixed(1)}%
            </span>
          </div>
          <textarea
            className="input w-full font-mono text-sm bg-[var(--surface-2)]"
            rows={6}
            readOnly
            value={minified}
          />
        </div>
      )}
    </div>
  );
}
