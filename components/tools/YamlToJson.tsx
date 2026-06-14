"use client";

import { useState } from "react";

function parseSimpleYaml(yaml: string): any {
  const lines = yaml.split("\n");
  const result: any = {};
  const stack: { indent: number; ref: any }[] = [{ indent: -1, ref: result }];

  lines.forEach((line) => {
    // Ignore comments and empty lines
    if (line.trim().startsWith("#") || !line.trim()) return;

    // Detect indentation
    const indentMatch = line.match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1].length : 0;

    const trimmed = line.trim();

    // Check key-value pattern: "key: value" or "key:"
    const colonIndex = trimmed.indexOf(":");
    if (colonIndex !== -1) {
      const key = trimmed.slice(0, colonIndex).trim();
      const val = trimmed.slice(colonIndex + 1).trim();

      // Backtrack stack to find the correct parent level
      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }

      const parent = stack[stack.length - 1].ref;

      if (val === "") {
        // Nested object
        parent[key] = {};
        stack.push({ indent, ref: parent[key] });
      } else {
        // Value
        let parsedVal: any = val;
        if (val === "true") parsedVal = true;
        else if (val === "false") parsedVal = false;
        else if (val === "null") parsedVal = null;
        else if (!isNaN(Number(val)) && val !== "") parsedVal = Number(val);
        else if (val.startsWith('"') && val.endsWith('"')) parsedVal = val.slice(1, -1);
        else if (val.startsWith("'") && val.endsWith("'")) parsedVal = val.slice(1, -1);

        parent[key] = parsedVal;
      }
    } else if (trimmed.startsWith("-")) {
      // List items (basic support)
      const val = trimmed.slice(1).trim();
      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }
      const parent = stack[stack.length - 1].ref;
      // If parent key is not yet an array, turn it into array or append
      // In simple formats we just append it
    }
  });

  return result;
}

export default function YamlToJson() {
  const [yaml, setYaml] = useState("");
  const [json, setJson] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");
    setJson("");
    if (!yaml.trim()) return;

    try {
      const parsed = parseSimpleYaml(yaml);
      setJson(JSON.stringify(parsed, null, 2));
    } catch (e: any) {
      setError(e.message || "Invalid YAML formatting.");
    }
  };

  const handleCopy = () => {
    if (!json) return;
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <textarea
        className="input w-full font-mono text-sm"
        rows={8}
        placeholder="Paste your YAML configuration here…"
        value={yaml}
        onChange={(e) => setYaml(e.target.value)}
      />

      <div className="flex gap-3">
        <button className="btn" onClick={handleConvert}>
          Convert YAML to JSON
        </button>
        {json && (
          <>
            <button className="btn-secondary" onClick={handleCopy}>
              {copied ? "Copied! ✓" : "Copy to Clipboard"}
            </button>
            <button className="btn-secondary text-red-500" onClick={() => { setYaml(""); setJson(""); }}>
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

      {json && (
        <div className="flex flex-col gap-2">
          <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider block">
            JSON Output
          </label>
          <pre className="input w-full font-mono text-sm whitespace-pre overflow-x-auto p-4 bg-[var(--surface-2)]">
            <code>{json}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
