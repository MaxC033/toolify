"use client";

import { useState } from "react";

export default function TextToSlug() {
  const [text, setText] = useState("");
  const [slug, setSlug] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const generated = text
      .toLowerCase()
      .trim()
      // replace special chars
      .replace(/[^a-z0-9\s-]/g, "")
      // replace spaces and underscores with single dash
      .replace(/[\s_]+/g, "-")
      // dedupe dashes
      .replace(/-+/g, "-");
    setSlug(generated);
  };

  const handleCopy = () => {
    if (!slug) return;
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider block mb-1">
          Input Title or Text
        </label>
        <input
          type="text"
          className="input w-full"
          placeholder="e.g. 10 Best Productivity Tools for Developers in 2026!"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button className="btn self-start" onClick={handleGenerate}>
        Generate Slug
      </button>

      {slug && (
        <div className="bg-[var(--surface-2)] p-4 rounded-xl border border-[var(--border)] flex flex-col gap-3">
          <div>
            <div className="text-xs text-[var(--text-secondary)] font-bold mb-1">Generated Slug</div>
            <code className="font-mono text-sm break-all text-[var(--accent)] font-bold">{slug}</code>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary" onClick={handleCopy}>
              {copied ? "Copied! ✓" : "Copy to Clipboard"}
            </button>
            <button className="btn-secondary text-red-500" onClick={() => { setText(""); setSlug(""); }}>
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
