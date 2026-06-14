"use client";

import { useState } from "react";

export default function Base64Tool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const process = (text: string, m: "encode" | "decode") => {
    setError("");
    try {
      if (m === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(text))));
      } else {
        setOutput(decodeURIComponent(escape(atob(text.trim()))));
      }
    } catch {
      setError(m === "decode" ? "Invalid Base64 string." : "Encoding failed.");
      setOutput("");
    }
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const swap = () => {
    const next: "encode" | "decode" = mode === "encode" ? "decode" : "encode";
    setMode(next);
    setInput(output);
    process(output, next);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Mode selector */}
      <div className="flex gap-2">
        {(["encode", "decode"] as const).map((m) => (
          <button
            key={m}
            className={`tag capitalize ${mode === m ? "active" : ""}`}
            onClick={() => { setMode(m); process(input, m); }}
            id={`mode-${m}`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Input */}
      <div>
        <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2 block">
          {mode === "encode" ? "Text Input" : "Base64 Input"}
        </label>
        <textarea
          className="input"
          rows={6}
          id="base64-input"
          placeholder={
            mode === "encode"
              ? "Paste plain text to encode…"
              : "Paste Base64 string to decode…"
          }
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            process(e.target.value, mode);
          }}
        />
      </div>

      {/* Swap button */}
      <button className="btn-secondary self-center" onClick={swap} id="swap-btn">
        ⇅ Swap Input & Output
      </button>

      {/* Output */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
            {mode === "encode" ? "Base64 Output" : "Decoded Text"}
          </label>
          {output && (
            <button className="btn-secondary py-1 px-3 text-xs" onClick={copy} id="copy-output-btn">
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          )}
        </div>
        {error ? (
          <div
            className="rounded-xl p-4 text-sm font-medium"
            style={{ background: "rgba(248,113,113,0.1)", border: "1px solid var(--red)", color: "var(--red)" }}
          >
            ⚠ {error}
          </div>
        ) : (
          <textarea
            className="input"
            rows={6}
            id="base64-output"
            readOnly
            value={output}
            placeholder="Output will appear here…"
          />
        )}
      </div>

      <p className="text-xs text-[var(--text-muted)]">
        Supports Unicode text. All processing happens locally in your browser.
      </p>
    </div>
  );
}
