"use client";

import { useState } from "react";

function minifyJS(js: string): string {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, "") // remove block comments
    .replace(/\/\/.*$/gm, "")         // remove line comments
    .replace(/\s+/g, " ")             // collapse whitespaces
    .replace(/\s*([=+\-*/%&|<>!?:;.,{}()\[\]])\s*/g, "$1") // strip spaces around operators
    .trim();
}

export default function JsMinifier() {
  const [js, setJs] = useState("");
  const [minified, setMinified] = useState("");
  const [copied, setCopied] = useState(false);

  const handleMinify = () => {
    setMinified(minifyJS(js));
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
        placeholder="Paste your uncompressed JavaScript code here…"
        value={js}
        onChange={(e) => setJs(e.target.value)}
      />

      <div className="flex gap-3">
        <button className="btn" onClick={handleMinify}>
          Minify JavaScript
        </button>
        {minified && (
          <>
            <button className="btn-secondary" onClick={handleCopy}>
              {copied ? "Copied! ✓" : "Copy to Clipboard"}
            </button>
            <button className="btn-secondary text-red-500" onClick={() => { setJs(""); setMinified(""); }}>
              Clear
            </button>
          </>
        )}
      </div>

      {minified && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider block">
              Minified JavaScript
            </label>
            <span className="text-xs text-[var(--text-muted)]">
              Shrunk by {((1 - minified.length / (js.length || 1)) * 100).toFixed(1)}%
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
