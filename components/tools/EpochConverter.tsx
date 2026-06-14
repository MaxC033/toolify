"use client";

import { useState, useEffect } from "react";

export default function EpochConverter() {
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [inputTimestamp, setInputTimestamp] = useState("");
  const [parsedDate, setParsedDate] = useState({ gmt: "", local: "" });
  const [inputDate, setInputDate] = useState("");
  const [convertedTimestamp, setConvertedTimestamp] = useState("");

  useEffect(() => {
    setCurrentEpoch(Math.floor(Date.now() / 1000));
    const timer = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleConvertTimestamp = () => {
    const num = parseInt(inputTimestamp);
    if (isNaN(num)) {
      alert("Please enter a valid numeric timestamp.");
      return;
    }
    // Detect if milliseconds (13-digit) or seconds (10-digit)
    const isMs = inputTimestamp.trim().length > 11;
    const date = new Date(isMs ? num : num * 1000);
    
    if (isNaN(date.getTime())) {
      setParsedDate({ gmt: "Invalid date", local: "Invalid date" });
    } else {
      setParsedDate({
        gmt: date.toUTCString(),
        local: date.toLocaleString(),
      });
    }
  };

  const handleConvertDate = () => {
    const date = new Date(inputDate);
    if (isNaN(date.getTime())) {
      setConvertedTimestamp("Invalid Date format");
    } else {
      setConvertedTimestamp(Math.floor(date.getTime() / 1000).toString());
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Current time display */}
      <div className="bg-[var(--surface-2)] p-4 rounded-xl text-center border border-[var(--border)]">
        <div className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">
          Current Unix Epoch Time
        </div>
        <div className="text-3xl font-mono font-bold gradient-text">{currentEpoch}</div>
        <div className="text-xs text-[var(--text-muted)] mt-1">Updates in real-time</div>
      </div>

      <hr className="border-[var(--border)]" />

      {/* Timestamp to Date */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
          Convert Unix Timestamp to Date
        </h3>
        <div className="flex gap-3">
          <input
            type="text"
            className="input font-mono flex-1"
            placeholder="e.g. 1718361600 (seconds) or 1718361600000 (ms)"
            value={inputTimestamp}
            onChange={(e) => setInputTimestamp(e.target.value)}
          />
          <button className="btn" onClick={handleConvertTimestamp}>
            Convert
          </button>
        </div>
        {parsedDate.gmt && (
          <div className="mt-3 bg-[var(--surface-2)] p-3 rounded-lg border border-[var(--border)] text-sm flex flex-col gap-1">
            <div>
              <span className="font-semibold text-[var(--text-secondary)]">GMT/UTC: </span>
              <code className="font-mono">{parsedDate.gmt}</code>
            </div>
            <div>
              <span className="font-semibold text-[var(--text-secondary)]">Local Time: </span>
              <code className="font-mono">{parsedDate.local}</code>
            </div>
          </div>
        )}
      </div>

      <hr className="border-[var(--border)]" />

      {/* Date to Timestamp */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
          Convert Date to Unix Timestamp
        </h3>
        <div className="flex gap-3">
          <input
            type="text"
            className="input font-mono flex-1"
            placeholder="e.g. 2026-06-15 12:00:00 or ISO strings"
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
          />
          <button className="btn" onClick={handleConvertDate}>
            Convert
          </button>
        </div>
        {convertedTimestamp && (
          <div className="mt-3 bg-[var(--surface-2)] p-3 rounded-lg border border-[var(--border)] text-sm">
            <span className="font-semibold text-[var(--text-secondary)]">Epoch Timestamp: </span>
            <code className="font-mono text-[var(--accent)] font-bold">{convertedTimestamp}</code>
          </div>
        )}
      </div>
    </div>
  );
}
