"use client";

import { useState } from "react";

export default function DiffChecker() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [diffResult, setDiffResult] = useState<{ type: "add" | "remove" | "same"; text: string }[] | null>(null);

  const handleCompare = () => {
    const origLines = original.split("\n");
    const modLines = modified.split("\n");
    const result: { type: "add" | "remove" | "same"; text: string }[] = [];

    let i = 0;
    let j = 0;

    while (i < origLines.length || j < modLines.length) {
      if (i < origLines.length && j < modLines.length) {
        if (origLines[i] === modLines[j]) {
          result.push({ type: "same", text: origLines[i] });
          i++;
          j++;
        } else {
          // Simple diff check: look ahead to see if one was inserted or deleted
          if (origLines.slice(i).indexOf(modLines[j]) > 0) {
            // Original line was removed
            result.push({ type: "remove", text: origLines[i] });
            i++;
          } else if (modLines.slice(j).indexOf(origLines[i]) > 0) {
            // Modified line was added
            result.push({ type: "add", text: modLines[j] });
            j++;
          } else {
            // Lines modified/replaced: show removal then addition
            result.push({ type: "remove", text: origLines[i] });
            result.push({ type: "add", text: modLines[j] });
            i++;
            j++;
          }
        }
      } else if (i < origLines.length) {
        result.push({ type: "remove", text: origLines[i] });
        i++;
      } else {
        result.push({ type: "add", text: modLines[j] });
        j++;
      }
    }

    setDiffResult(result);
  };

  const handleClear = () => {
    setOriginal("");
    setModified("");
    setDiffResult(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider block mb-1">
            Original Text
          </label>
          <textarea
            className="input w-full font-mono text-sm"
            rows={8}
            placeholder="Paste your original version here…"
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider block mb-1">
            Modified Text
          </label>
          <textarea
            className="input w-full font-mono text-sm"
            rows={8}
            placeholder="Paste your modified version here…"
            value={modified}
            onChange={(e) => setModified(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button className="btn" onClick={handleCompare}>
          Compare Text
        </button>
        <button className="btn-secondary" onClick={handleClear}>
          Clear
        </button>
      </div>

      {diffResult && (
        <div className="bg-[var(--surface-2)] p-4 rounded-xl border border-[var(--border)] overflow-x-auto">
          <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
            Comparison Output
          </h3>
          <pre className="font-mono text-xs leading-5 select-text">
            {diffResult.map((line, idx) => {
              let className = "text-[var(--text-muted)]";
              let prefix = "  ";
              if (line.type === "add") {
                className = "bg-green-950/30 text-green-400 px-1 border-l-2 border-green-500 block";
                prefix = "+ ";
              } else if (line.type === "remove") {
                className = "bg-red-950/30 text-red-400 px-1 border-l-2 border-red-500 block";
                prefix = "- ";
              } else {
                className = "block px-1 border-l-2 border-transparent";
              }
              return (
                <code key={idx} className={className}>
                  {prefix}
                  {line.text || " "}
                </code>
              );
            })}
          </pre>
        </div>
      )}
    </div>
  );
}
