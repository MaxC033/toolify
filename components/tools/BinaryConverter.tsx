"use client";

import { useState } from "react";

function textToBinary(text: string): string {
  return Array.from(text)
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
}

function binaryToText(binary: string): string {
  try {
    return binary
      .split(/\s+/)
      .filter(Boolean)
      .map((bin) => String.fromCharCode(parseInt(bin, 2)))
      .join("");
  } catch (e) {
    return "Error: Invalid binary format.";
  }
}

export default function BinaryConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleToBinary = () => {
    setOutput(textToBinary(input));
  };

  const handleToText = () => {
    setOutput(binaryToText(input));
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <textarea
        className="input w-full font-mono text-sm"
        rows={8}
        placeholder="Enter plain text (to convert to binary) OR binary code sequence (to convert to text)…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex gap-3">
        <button className="btn" onClick={handleToBinary}>
          Convert to Binary
        </button>
        <button className="btn" onClick={handleToText}>
          Convert to Text
        </button>
        {output && (
          <>
            <button className="btn-secondary" onClick={handleCopy}>
              {copied ? "Copied! ✓" : "Copy to Clipboard"}
            </button>
            <button className="btn-secondary text-red-500" onClick={() => { setInput(""); setOutput(""); }}>
              Clear
            </button>
          </>
        )}
      </div>

      {output && (
        <div className="flex flex-col gap-2">
          <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider block">
            Output Result
          </label>
          <textarea
            className="input w-full font-mono text-sm bg-[var(--surface-2)]"
            rows={6}
            readOnly
            value={output}
          />
        </div>
      )}
    </div>
  );
}
