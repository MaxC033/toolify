"use client";

import { useState } from "react";

export default function HtmlEntities() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    // Basic HTML Entity encoding
    const div = document.createElement("div");
    div.textContent = input;
    setInput(div.innerHTML);
  };

  const handleDecode = () => {
    // Basic HTML Entity decoding
    const div = document.createElement("div");
    div.innerHTML = input;
    setInput(div.textContent || "");
  };

  const handleCopy = () => {
    if (!input) return;
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <textarea
        className="input w-full font-mono text-sm"
        rows={8}
        placeholder="Enter text or HTML code here…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex flex-wrap gap-3">
        <button className="btn" onClick={handleEncode}>
          Escape HTML (Encode)
        </button>
        <button className="btn" onClick={handleDecode}>
          Unescape HTML (Decode)
        </button>
        {input && (
          <>
            <button className="btn-secondary" onClick={handleCopy}>
              {copied ? "Copied! ✓" : "Copy to Clipboard"}
            </button>
            <button className="btn-secondary text-red-500" onClick={() => setInput("")}>
              Clear
            </button>
          </>
        )}
      </div>
    </div>
  );
}
