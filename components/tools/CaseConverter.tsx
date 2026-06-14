"use client";

import { useState } from "react";

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const toUpperCase = () => setText(text.toUpperCase());
  const toLowerCase = () => setText(text.toLowerCase());

  const toTitleCase = () => {
    const title = text.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
    setText(title);
  };

  const toSentenceCase = () => {
    const sentences = text.toLowerCase().split(/([.!?]\s*)/);
    const converted = sentences.map((part) => {
      if (!part || /^[.!?]\s*$/.test(part)) return part;
      // Capitalize first non-whitespace character
      const match = part.match(/^(\s*)(\w)(.*)$/);
      if (match) {
        return match[1] + match[2].toUpperCase() + match[3];
      }
      return part;
    });
    setText(converted.join(""));
  };

  const toCamelCase = () => {
    const camel = text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
      .replace(/[^a-zA-Z0-9]/g, "");
    // ensure first letter is lowercase
    if (camel.length > 0) {
      setText(camel.charAt(0).toLowerCase() + camel.slice(1));
    } else {
      setText("");
    }
  };

  const toSlugCase = () => {
    const slug = text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    setText(slug);
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <textarea
        className="input w-full font-mono text-sm"
        rows={8}
        placeholder="Paste text here to convert case styles…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex flex-wrap gap-2">
        <button className="btn" onClick={toUpperCase}>
          UPPERCASE
        </button>
        <button className="btn" onClick={toLowerCase}>
          lowercase
        </button>
        <button className="btn" onClick={toTitleCase}>
          Title Case
        </button>
        <button className="btn" onClick={toSentenceCase}>
          Sentence case
        </button>
        <button className="btn" onClick={toCamelCase}>
          camelCase
        </button>
        <button className="btn" onClick={toSlugCase}>
          slug-case
        </button>
      </div>

      {text && (
        <div className="flex gap-2">
          <button className="btn-secondary" onClick={handleCopy}>
            {copied ? "Copied! ✓" : "Copy to Clipboard"}
          </button>
          <button className="btn-secondary text-red-500" onClick={() => setText("")}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
