"use client";

import { useState, useEffect } from "react";

function analyzeText(text: string) {
  const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean) : [];
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const paragraphs = text.split(/\n{2,}/).filter((p) => p.trim().length > 0);

  // Keyword density (top 5 non-stopwords)
  const stopwords = new Set([
    "the","a","an","and","or","but","in","on","at","to","for","of","with",
    "is","are","was","were","be","been","has","have","had","do","does","did",
    "it","its","this","that","these","those","i","you","he","she","we","they",
  ]);
  const freq: Record<string, number> = {};
  words.forEach((w) => {
    const clean = w.toLowerCase().replace(/[^a-z]/g, "");
    if (clean.length > 2 && !stopwords.has(clean)) {
      freq[clean] = (freq[clean] || 0) + 1;
    }
  });
  const topKeywords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word, count]) => ({
      word,
      count,
      density: words.length ? ((count / words.length) * 100).toFixed(1) : "0",
    }));

  return {
    wordCount: words.length,
    charCount: text.length,
    charNoSpace: text.replace(/\s/g, "").length,
    sentenceCount: sentences.length,
    paragraphCount: paragraphs.length,
    avgWordLength: words.length
      ? (words.reduce((s, w) => s + w.replace(/[^a-zA-Z]/g, "").length, 0) / words.length).toFixed(1)
      : "0",
    readingTime: Math.max(1, Math.ceil(words.length / 200)),
    topKeywords,
  };
}

export default function WordCounter() {
  const [text, setText] = useState("");
  const stats = analyzeText(text);

  return (
    <div className="flex flex-col gap-6">
      <textarea
        id="word-counter-input"
        className="input"
        rows={10}
        placeholder="Start typing or paste your text here…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ minHeight: 200 }}
      />

      {/* Main stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Words", value: stats.wordCount.toLocaleString(), highlight: true },
          { label: "Characters", value: stats.charCount.toLocaleString() },
          { label: "No Spaces", value: stats.charNoSpace.toLocaleString() },
          { label: "Sentences", value: stats.sentenceCount.toLocaleString() },
          { label: "Paragraphs", value: stats.paragraphCount.toLocaleString() },
          { label: "Avg Word Length", value: `${stats.avgWordLength} chars` },
          { label: "Reading Time", value: `${stats.readingTime} min` },
          { label: "Speaking Time", value: `${Math.max(1, Math.ceil(stats.wordCount / 130))} min` },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-[var(--surface-2)] rounded-xl p-4 text-center border border-[var(--border)]"
          >
            <div
              className={`text-2xl font-bold ${
                item.highlight ? "gradient-text" : "text-[var(--text-primary)]"
              }`}
            >
              {item.value}
            </div>
            <div className="text-xs text-[var(--text-muted)] mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Keyword density */}
      {stats.topKeywords.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
            Top Keywords
          </h3>
          <div className="flex flex-col gap-2">
            {stats.topKeywords.map(({ word, count, density }) => (
              <div key={word} className="flex items-center gap-3">
                <span className="text-sm font-mono text-[var(--text-primary)] w-28 truncate">
                  {word}
                </span>
                <div className="flex-1 h-1.5 bg-[var(--border)] rounded-full">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(100, parseFloat(density) * 10)}%`,
                      background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
                    }}
                  />
                </div>
                <span className="text-xs text-[var(--text-muted)] w-24 text-right">
                  {count}× ({density}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Clear button */}
      {text && (
        <button
          className="btn-secondary self-start"
          onClick={() => setText("")}
          id="clear-text-btn"
        >
          Clear text
        </button>
      )}
    </div>
  );
}
