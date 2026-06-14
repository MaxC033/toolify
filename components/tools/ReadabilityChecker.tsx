"use client";

import { useState } from "react";

function countSyllables(word: string) {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function analyzeText(text: string) {
  if (!text.trim()) return null;

  const words = text.trim().split(/\s+/).filter(Boolean);
  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;

  const syllableCount = words.reduce((sum, w) => sum + countSyllables(w), 0);
  const avgSyllablesPerWord = words.length ? syllableCount / words.length : 0;
  const avgWordsPerSentence = sentences.length
    ? words.length / sentences.length
    : 0;

  // Flesch Reading Ease
  const fleschEase =
    206.835 -
    1.015 * avgWordsPerSentence -
    84.6 * avgSyllablesPerWord;

  // Flesch-Kincaid Grade
  const fkGrade =
    0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;

  // Gunning Fog
  const complexWords = words.filter((w) => countSyllables(w) >= 3).length;
  const fogIndex =
    words.length && sentences.length
      ? 0.4 * (avgWordsPerSentence + (100 * complexWords) / words.length)
      : 0;

  return {
    wordCount: words.length,
    charCount: chars,
    charCountNoSpace: charsNoSpace,
    sentenceCount: sentences.length,
    paragraphCount: paragraphs.length,
    readingTime: Math.ceil(words.length / 200),
    speakingTime: Math.ceil(words.length / 130),
    fleschEase: Math.max(0, Math.min(100, Math.round(fleschEase * 10) / 10)),
    fkGrade: Math.max(0, Math.round(fkGrade * 10) / 10),
    fogIndex: Math.max(0, Math.round(fogIndex * 10) / 10),
  };
}

function fleschLabel(score: number) {
  if (score >= 90) return { label: "Very Easy", color: "var(--green)" };
  if (score >= 70) return { label: "Easy", color: "#60d97b" };
  if (score >= 60) return { label: "Standard", color: "var(--yellow)" };
  if (score >= 50) return { label: "Fairly Difficult", color: "#fb923c" };
  return { label: "Difficult", color: "var(--red)" };
}

export default function ReadabilityChecker() {
  const [text, setText] = useState("");
  const stats = analyzeText(text);

  return (
    <div className="flex flex-col gap-6">
      <textarea
        className="input"
        id="readability-input"
        rows={10}
        placeholder="Paste your text here to analyze readability…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ minHeight: 220 }}
      />

      {stats ? (
        <>
          {/* Count stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Words", value: stats.wordCount.toLocaleString() },
              { label: "Characters", value: stats.charCount.toLocaleString() },
              { label: "Sentences", value: stats.sentenceCount.toLocaleString() },
              { label: "Paragraphs", value: stats.paragraphCount.toLocaleString() },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-[var(--surface-2)] rounded-xl p-4 text-center border border-[var(--border)]"
              >
                <div className="text-2xl font-bold gradient-text">{item.value}</div>
                <div className="text-xs text-[var(--text-muted)] mt-1">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Time estimates */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[var(--surface-2)] rounded-xl p-4 border border-[var(--border)]">
              <div className="text-lg font-bold text-[var(--accent)]">
                ~{stats.readingTime} min
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-1">Reading time (200 wpm)</div>
            </div>
            <div className="bg-[var(--surface-2)] rounded-xl p-4 border border-[var(--border)]">
              <div className="text-lg font-bold text-[var(--accent)]">
                ~{stats.speakingTime} min
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-1">Speaking time (130 wpm)</div>
            </div>
          </div>

          {/* Readability scores */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-3 uppercase tracking-wider">
              Readability Scores
            </h3>
            <div className="flex flex-col gap-3">
              {/* Flesch Reading Ease */}
              <div className="bg-[var(--surface-2)] rounded-xl p-4 border border-[var(--border)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Flesch Reading Ease</span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: fleschLabel(stats.fleschEase).color }}
                  >
                    {stats.fleschEase} — {fleschLabel(stats.fleschEase).label}
                  </span>
                </div>
                <div className="h-1.5 bg-[var(--border)] rounded-full">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${stats.fleschEase}%`,
                      background: fleschLabel(stats.fleschEase).color,
                    }}
                  />
                </div>
              </div>

              {/* FK Grade */}
              <div className="bg-[var(--surface-2)] rounded-xl p-4 border border-[var(--border)]">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Flesch-Kincaid Grade</span>
                  <span className="text-sm font-bold text-[var(--accent)]">
                    Grade {stats.fkGrade}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Suitable for readers with a {Math.round(stats.fkGrade + 6)}th grade education
                </p>
              </div>

              {/* Gunning Fog */}
              <div className="bg-[var(--surface-2)] rounded-xl p-4 border border-[var(--border)]">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Gunning Fog Index</span>
                  <span className="text-sm font-bold text-[var(--accent)]">
                    {stats.fogIndex}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Needs ~{Math.round(stats.fogIndex)} years of education to understand
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-10 text-[var(--text-muted)]">
          <div className="text-5xl mb-3">📊</div>
          <p>Paste some text above to see readability analysis</p>
        </div>
      )}
    </div>
  );
}
