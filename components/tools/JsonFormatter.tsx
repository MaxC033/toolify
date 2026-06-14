"use client";

import { useState } from "react";

type IndentSize = 2 | 4;

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState<IndentSize>(2);
  const [copied, setCopied] = useState(false);

  const format = (text: string, spaces: IndentSize) => {
    setError("");
    if (!text.trim()) { setOutput(""); return; }
    try {
      const parsed = JSON.parse(text);
      setOutput(JSON.stringify(parsed, null, spaces));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      setOutput("");
    }
  };

  const minify = () => {
    setError("");
    if (!input.trim()) return;
    try {
      setOutput(JSON.stringify(JSON.parse(input)));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    }
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-2 items-center">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Indent:</span>
          {([2, 4] as IndentSize[]).map((n) => (
            <button
              key={n}
              className={`tag ${indent === n ? "active" : ""}`}
              onClick={() => { setIndent(n); format(input, n); }}
              id={`indent-${n}`}
            >
              {n} spaces
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div>
        <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2 block">
          JSON Input
        </label>
        <textarea
          className="input font-mono text-sm"
          rows={10}
          id="json-input"
          placeholder='{"key": "value", "array": [1, 2, 3]}'
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            format(e.target.value, indent);
          }}
          style={{ minHeight: 200 }}
        />
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <button className="btn-primary" onClick={() => format(input, indent)} id="format-btn">
          ✨ Format / Beautify
        </button>
        <button className="btn-secondary" onClick={minify} id="minify-btn">
          📦 Minify
        </button>
        <button
          className="btn-secondary"
          onClick={() => { setInput(""); setOutput(""); setError(""); }}
          id="clear-json-btn"
        >
          Clear
        </button>
      </div>

      {/* Error */}
      {error && (
        <div
          className="rounded-xl p-4 text-sm"
          style={{ background: "rgba(248,113,113,0.08)", border: "1px solid var(--red)", color: "var(--red)" }}
        >
          <span className="font-semibold">Syntax Error:</span> {error}
        </div>
      )}

      {/* Output */}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
              Formatted Output
            </label>
            <button className="btn-secondary py-1 px-3 text-xs" onClick={copy} id="copy-json-output">
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <pre
            className="input font-mono text-sm overflow-auto"
            style={{
              background: "var(--surface-2)",
              borderRadius: 10,
              padding: "14px",
              maxHeight: 400,
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
            }}
          >
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
