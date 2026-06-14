"use client";

import { useState } from "react";

function formatSQL(sql: string): string {
  // Simple token-based formatter
  const keywords = [
    "SELECT", "FROM", "WHERE", "AND", "OR", "JOIN", "LEFT JOIN", "RIGHT JOIN",
    "INNER JOIN", "ON", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "INSERT INTO",
    "VALUES", "UPDATE", "SET", "DELETE FROM"
  ];

  let cleaned = sql
    .replace(/\s+/g, " ")
    .trim();

  // Create a regex to match keywords with boundaries
  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    cleaned = cleaned.replace(regex, `\n${keyword}`);
  });

  // Split and format lines
  const lines = cleaned.split("\n");
  let indentLevel = 0;
  const formattedLines = lines.map((line) => {
    let trimmed = line.trim();
    if (!trimmed) return "";
    
    // Convert first word (the keyword) to uppercase
    const words = trimmed.split(" ");
    if (keywords.includes(words[0].toUpperCase())) {
      words[0] = words[0].toUpperCase();
    }
    trimmed = words.join(" ");

    // Adjust indentation
    let indent = "  ".repeat(indentLevel);
    return indent + trimmed;
  });

  return formattedLines.filter(Boolean).join("\n");
}

export default function SqlFormatter() {
  const [sql, setSql] = useState("");
  const [formatted, setFormatted] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    setFormatted(formatSQL(sql));
  };

  const handleCopy = () => {
    if (!formatted) return;
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <textarea
        className="input w-full font-mono text-sm"
        rows={8}
        placeholder="Paste your unformatted SQL query here…"
        value={sql}
        onChange={(e) => setSql(e.target.value)}
      />

      <div className="flex gap-3">
        <button className="btn" onClick={handleFormat}>
          Format SQL
        </button>
        {formatted && (
          <>
            <button className="btn-secondary" onClick={handleCopy}>
              {copied ? "Copied! ✓" : "Copy to Clipboard"}
            </button>
            <button className="btn-secondary text-red-500" onClick={() => { setSql(""); setFormatted(""); }}>
              Clear
            </button>
          </>
        )}
      </div>

      {formatted && (
        <div className="flex flex-col gap-2">
          <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider block">
            Formatted SQL
          </label>
          <pre className="input w-full font-mono text-sm whitespace-pre overflow-x-auto p-4 bg-[var(--surface-2)]">
            <code>{formatted}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
