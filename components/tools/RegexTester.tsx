"use client";

import { useState } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleTest = () => {
    setError("");
    setMatches([]);
    if (!pattern) return;

    try {
      const regex = new RegExp(pattern, flags);
      // Run match
      if (flags.includes("g")) {
        const found = testString.match(regex);
        if (found) {
          setMatches(found);
        }
      } else {
        const found = testString.match(regex);
        if (found) {
          setMatches([found[0]]);
        }
      }
    } catch (e: any) {
      setError(e.message || "Invalid regular expression pattern.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-[var(--surface-2)] p-4 rounded-xl border border-[var(--border)]">
        <div className="md:col-span-2">
          <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider block mb-1">
            Regex Pattern
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 font-mono text-sm text-[var(--text-muted)]">/</span>
            <input
              type="text"
              className="input w-full font-mono text-sm pl-5 pr-8"
              placeholder="[a-zA-Z0-9]+"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
            />
            <span className="absolute right-3 font-mono text-sm text-[var(--text-muted)]">/</span>
          </div>
        </div>

        <div>
          <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider block mb-1">
            Flags
          </label>
          <input
            type="text"
            className="input w-full font-mono text-sm"
            placeholder="g, i, m"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider block mb-1">
          Test String
        </label>
        <textarea
          className="input w-full font-mono text-sm"
          rows={6}
          placeholder="Enter test string here to match against your regex…"
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
        />
      </div>

      <button className="btn self-start" onClick={handleTest}>
        Test Regex
      </button>

      {error && (
        <div className="p-3 bg-red-950/30 text-red-400 border-l-2 border-red-500 rounded text-sm font-mono break-all">
          ⚠️ {error}
        </div>
      )}

      {matches.length > 0 && (
        <div className="bg-[var(--surface-2)] p-4 rounded-xl border border-[var(--border)]">
          <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
            Matches Found ({matches.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {matches.map((match, idx) => (
              <span
                key={idx}
                className="font-mono text-xs bg-[var(--border)] text-[var(--text-primary)] px-2 py-1 rounded border border-[var(--border)] break-all"
              >
                {match}
              </span>
            ))}
          </div>
        </div>
      )}

      {pattern && testString && !error && matches.length === 0 && (
        <div className="p-3 bg-yellow-950/30 text-yellow-500 border-l-2 border-yellow-500 rounded text-sm font-mono">
          No matches found.
        </div>
      )}
    </div>
  );
}
