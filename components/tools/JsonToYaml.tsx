"use client";

import { useState } from "react";

function jsonToYaml(obj: any, indent = 0): string {
  const spaces = "  ".repeat(indent);
  if (obj === null) return "null";
  if (typeof obj === "string") return `"${obj.replace(/"/g, '\\"')}"`;
  if (typeof obj === "number" || typeof obj === "boolean") return String(obj);

  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    return obj
      .map((item) => `${spaces}- ${jsonToYaml(item, indent + 1).trim()}`)
      .join("\n");
  }

  if (typeof obj === "object") {
    const keys = Object.keys(obj);
    if (keys.length === 0) return "{}";
    return keys
      .map((key) => {
        const val = obj[key];
        const valStr = jsonToYaml(val, indent + 1);
        if (typeof val === "object" && val !== null) {
          return `${spaces}${key}:\n${valStr}`;
        }
        return `${spaces}${key}: ${valStr.trim()}`;
      })
      .join("\n");
  }
  return "";
}

export default function JsonToYaml() {
  const [json, setJson] = useState("");
  const [yaml, setYaml] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");
    setYaml("");
    if (!json.trim()) return;

    try {
      const parsed = JSON.parse(json);
      setYaml(jsonToYaml(parsed));
    } catch (e: any) {
      setError(e.message || "Invalid JSON syntax.");
    }
  };

  const handleCopy = () => {
    if (!yaml) return;
    navigator.clipboard.writeText(yaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <textarea
        className="input w-full font-mono text-sm"
        rows={8}
        placeholder="Paste your JSON code here…"
        value={json}
        onChange={(e) => setJson(e.target.value)}
      />

      <div className="flex gap-3">
        <button className="btn" onClick={handleConvert}>
          Convert JSON to YAML
        </button>
        {yaml && (
          <>
            <button className="btn-secondary" onClick={handleCopy}>
              {copied ? "Copied! ✓" : "Copy to Clipboard"}
            </button>
            <button className="btn-secondary text-red-500" onClick={() => { setJson(""); setYaml(""); }}>
              Clear
            </button>
          </>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-950/30 text-red-400 border-l-2 border-red-500 rounded text-sm font-mono">
          ⚠️ {error}
        </div>
      )}

      {yaml && (
        <div className="flex flex-col gap-2">
          <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider block">
            YAML Output
          </label>
          <pre className="input w-full font-mono text-sm whitespace-pre overflow-x-auto p-4 bg-[var(--surface-2)]">
            <code>{yaml}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
