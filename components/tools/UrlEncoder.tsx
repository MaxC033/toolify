"use client";

import { useState } from "react";

export default function UrlEncoder() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    try {
      setInput(encodeURIComponent(input));
    } catch (e) {
      alert("Error encoding URL");
    }
  };

  const handleDecode = () => {
    try {
      setInput(decodeURIComponent(input));
    } catch (e) {
      alert("Error decoding URL. Please check your percent-encoded format.");
    }
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
        placeholder="Enter text or URL parameter string here…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex flex-wrap gap-3">
        <button className="btn" onClick={handleEncode}>
          Encode URL
        </button>
        <button className="btn" onClick={handleDecode}>
          Decode URL
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
