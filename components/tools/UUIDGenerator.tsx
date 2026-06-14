"use client";

import { useState } from "react";

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const arr = new Uint8Array(1);
    crypto.getRandomValues(arr);
    const r = arr[0] % 16;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateULID(): string {
  const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
  const now = Date.now();
  let timePart = "";
  let t = now;
  for (let i = 9; i >= 0; i--) {
    timePart = ENCODING[t % 32] + timePart;
    t = Math.floor(t / 32);
  }
  let randPart = "";
  const randBytes = new Uint8Array(10);
  crypto.getRandomValues(randBytes);
  for (let i = 0; i < 10; i++) {
    randPart += ENCODING[randBytes[i] % 32];
  }
  return timePart + randPart;
}

export default function UUIDGenerator() {
  const [format, setFormat] = useState<"uuid" | "ulid">("uuid");
  const [count, setCount] = useState(5);
  const [ids, setIds] = useState<string[]>(() =>
    Array.from({ length: 5 }, generateUUID)
  );
  const [copied, setCopied] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = () => {
    setIds(
      Array.from({ length: count }, () =>
        format === "uuid" ? generateUUID() : generateULID()
      )
    );
  };

  const copy = async (id: string) => {
    await navigator.clipboard.writeText(id);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(ids.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1500);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Format and count */}
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2 block">
            Format
          </label>
          <div className="flex gap-2">
            {(["uuid", "ulid"] as const).map((f) => (
              <button
                key={f}
                className={`tag uppercase ${format === f ? "active" : ""}`}
                onClick={() => {
                  setFormat(f);
                  setIds(
                    Array.from({ length: count }, () =>
                      f === "uuid" ? generateUUID() : generateULID()
                    )
                  );
                }}
                id={`format-${f}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2 block">
            Count
          </label>
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value))))}
            className="input w-24"
            id="uuid-count"
          />
        </div>
      </div>

      {/* IDs list */}
      <div className="flex flex-col gap-2">
        {ids.map((id) => (
          <div
            key={id}
            className="flex items-center gap-3 bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-4 py-3 group hover:border-[var(--accent)] transition-colors cursor-pointer"
            onClick={() => copy(id)}
          >
            <span className="flex-1 font-mono text-sm text-[var(--text-primary)] tracking-wide">
              {id}
            </span>
            <span
              className="text-xs flex-shrink-0"
              style={{ color: copied === id ? "var(--green)" : "var(--text-muted)" }}
            >
              {copied === id ? "✓ Copied" : "Click to copy"}
            </span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="btn-primary" onClick={generate} id="generate-uuid-btn">
          🔄 Generate New
        </button>
        <button className="btn-secondary" onClick={copyAll} id="copy-all-btn">
          {copiedAll ? "✓ All Copied!" : "Copy All"}
        </button>
      </div>

      <p className="text-xs text-[var(--text-muted)]">
        {format === "uuid"
          ? "UUID v4 — cryptographically random, generated in your browser."
          : "ULID — lexicographically sortable unique IDs with timestamp prefix."}
      </p>
    </div>
  );
}
