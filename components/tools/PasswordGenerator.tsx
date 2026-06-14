"use client";

import { useState, useCallback } from "react";

const CHAR_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generatePassword(
  length: number,
  options: Record<string, boolean>
): string {
  let charset = "";
  if (options.uppercase) charset += CHAR_SETS.uppercase;
  if (options.lowercase) charset += CHAR_SETS.lowercase;
  if (options.numbers) charset += CHAR_SETS.numbers;
  if (options.symbols) charset += CHAR_SETS.symbols;
  if (!charset) return "";

  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr)
    .map((x) => charset[x % charset.length])
    .join("");
}

function getStrength(pw: string): { label: string; color: string; pct: number } {
  if (!pw) return { label: "None", color: "var(--border)", pct: 0 };
  let score = 0;
  if (pw.length >= 12) score++;
  if (pw.length >= 20) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 2) return { label: "Weak", color: "var(--red)", pct: 25 };
  if (score <= 3) return { label: "Fair", color: "var(--yellow)", pct: 50 };
  if (score <= 4) return { label: "Good", color: "#60d97b", pct: 75 };
  return { label: "Strong", color: "var(--green)", pct: 100 };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(20);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState(() =>
    generatePassword(20, { uppercase: true, lowercase: true, numbers: true, symbols: true })
  );
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(1);

  const regenerate = useCallback(() => {
    setPassword(generatePassword(length, options));
  }, [length, options]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = getStrength(password);

  return (
    <div className="flex flex-col gap-6">
      {/* Password display */}
      <div>
        <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2 block">
          Generated Password
        </label>
        <div
          className="flex items-center gap-3 bg-[var(--surface-2)] border border-[var(--border)] rounded-xl p-4"
        >
          <span className="flex-1 font-mono text-lg text-[var(--text-primary)] break-all leading-relaxed">
            {password || (
              <span className="text-[var(--text-muted)]">
                Select at least one character type
              </span>
            )}
          </span>
          <button
            onClick={copyToClipboard}
            className="btn-primary flex-shrink-0 copy-btn"
            id="copy-password-btn"
          >
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>

        {/* Strength bar */}
        <div className="mt-3 flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${strength.pct}%`,
                background: strength.color,
              }}
            />
          </div>
          <span
            className="text-xs font-semibold w-14 text-right"
            style={{ color: strength.color }}
          >
            {strength.label}
          </span>
        </div>
      </div>

      {/* Length */}
      <div>
        <label className="flex items-center justify-between text-sm font-medium mb-2">
          <span>Password Length</span>
          <span className="text-[var(--accent)] font-bold text-base">{length}</span>
        </label>
        <input
          type="range"
          min={8}
          max={64}
          value={length}
          onChange={(e) => {
            setLength(Number(e.target.value));
            setPassword(generatePassword(Number(e.target.value), options));
          }}
          className="w-full"
          id="password-length-slider"
        />
        <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1">
          <span>8</span>
          <span>64</span>
        </div>
      </div>

      {/* Options */}
      <div>
        <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-3 block">
          Character Types
        </label>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(options).map(([key, val]) => (
            <label
              key={key}
              className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
            >
              <input
                type="checkbox"
                checked={val}
                onChange={(e) => {
                  const next = { ...options, [key]: e.target.checked };
                  setOptions(next);
                  setPassword(generatePassword(length, next));
                }}
                id={`opt-${key}`}
              />
              <span className="text-sm capitalize text-[var(--text-secondary)]">
                {key === "uppercase"
                  ? "A–Z Uppercase"
                  : key === "lowercase"
                  ? "a–z Lowercase"
                  : key === "numbers"
                  ? "0–9 Numbers"
                  : "!@# Symbols"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Bulk generate */}
      <div>
        <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-3 block">
          Bulk Generate
        </label>
        <div className="flex gap-3">
          <input
            type="number"
            min={1}
            max={20}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(20, Number(e.target.value))))}
            className="input w-24"
            id="bulk-count-input"
          />
          <button
            className="btn-secondary flex-1"
            id="regenerate-btn"
            onClick={regenerate}
          >
            🔄 Regenerate
          </button>
        </div>
      </div>
    </div>
  );
}
