"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type Phase = "work" | "short-break" | "long-break";

const DEFAULTS = {
  work: 25,
  "short-break": 5,
  "long-break": 15,
};

const LABELS: Record<Phase, string> = {
  work: "Work Session",
  "short-break": "Short Break",
  "long-break": "Long Break",
};

const COLORS: Record<Phase, string> = {
  work: "var(--accent)",
  "short-break": "var(--green)",
  "long-break": "#60a5fa",
};

export default function PomodoroTimer() {
  const [durations, setDurations] = useState(DEFAULTS);
  const [phase, setPhase] = useState<Phase>("work");
  const [seconds, setSeconds] = useState(DEFAULTS.work * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<AudioContext | null>(null);

  const totalSeconds = durations[phase] * 60;
  const progress = ((totalSeconds - seconds) / totalSeconds) * 100;
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  const playBeep = useCallback(() => {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {}
  }, []);

  const switchPhase = useCallback(
    (newPhase: Phase) => {
      setPhase(newPhase);
      setSeconds(durations[newPhase] * 60);
      setIsRunning(false);
    },
    [durations]
  );

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            playBeep();
            setIsRunning(false);
            if (phase === "work") {
              setSessions((n) => n + 1);
              const next = sessions > 0 && (sessions + 1) % 4 === 0 ? "long-break" : "short-break";
              setPhase(next);
              return durations[next] * 60;
            } else {
              setPhase("work");
              return durations["work"] * 60;
            }
          }
          return s - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, phase, durations, sessions, playBeep]);

  const reset = () => {
    setIsRunning(false);
    setSeconds(durations[phase] * 60);
  };

  // Circumference for circular progress
  const R = 88;
  const circ = 2 * Math.PI * R;
  const strokeDash = circ * (1 - progress / 100);

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Phase tabs */}
      <div className="flex gap-2 bg-[var(--surface-2)] rounded-xl p-1.5 border border-[var(--border)]">
        {(["work", "short-break", "long-break"] as Phase[]).map((p) => (
          <button
            key={p}
            onClick={() => switchPhase(p)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            id={`phase-${p}`}
            style={{
              background: phase === p ? COLORS[p] : "transparent",
              color: phase === p ? "#fff" : "var(--text-secondary)",
            }}
          >
            {LABELS[p]}
          </button>
        ))}
      </div>

      {/* Circular timer */}
      <div className="relative w-52 h-52 flex items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" width="208" height="208">
          <circle cx="104" cy="104" r={R} fill="none" stroke="var(--border)" strokeWidth="8" />
          <circle
            cx="104"
            cy="104"
            r={R}
            fill="none"
            stroke={COLORS[phase]}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={strokeDash}
            style={{ transition: "stroke-dashoffset 0.8s ease, stroke 0.3s" }}
          />
        </svg>
        <div className="text-center z-10">
          <div
            className="text-5xl font-bold font-mono tabular-nums"
            style={{ color: COLORS[phase] }}
          >
            {mins}:{secs}
          </div>
          <div className="text-xs text-[var(--text-muted)] mt-1 uppercase tracking-wider">
            {LABELS[phase]}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          className="btn-primary w-32"
          onClick={() => setIsRunning((r) => !r)}
          id="pomodoro-toggle"
        >
          {isRunning ? "⏸ Pause" : "▶ Start"}
        </button>
        <button className="btn-secondary" onClick={reset} id="pomodoro-reset">
          ↺ Reset
        </button>
      </div>

      {/* Sessions count */}
      <div className="text-center">
        <div className="flex gap-2 justify-center mb-1">
          {Array.from({ length: Math.max(4, sessions) }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full transition-all"
              style={{
                background: i < sessions ? COLORS["work"] : "var(--border)",
                boxShadow: i < sessions ? `0 0 8px ${COLORS["work"]}` : "none",
              }}
            />
          ))}
        </div>
        <div className="text-sm text-[var(--text-muted)]">
          {sessions} session{sessions !== 1 ? "s" : ""} completed
        </div>
      </div>

      {/* Duration settings */}
      <div className="w-full grid grid-cols-3 gap-3 pt-4 border-t border-[var(--border)]">
        {(["work", "short-break", "long-break"] as Phase[]).map((p) => (
          <div key={p} className="text-center">
            <label className="text-xs text-[var(--text-muted)] mb-2 block">{LABELS[p]}</label>
            <div className="flex items-center gap-2 justify-center">
              <button
                className="w-7 h-7 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm hover:border-[var(--accent)] transition-colors"
                onClick={() => {
                  const next = Math.max(1, durations[p] - 1);
                  const d = { ...durations, [p]: next };
                  setDurations(d);
                  if (phase === p) setSeconds(next * 60);
                }}
              >
                −
              </button>
              <span className="text-sm font-bold w-8 text-center">{durations[p]}</span>
              <button
                className="w-7 h-7 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm hover:border-[var(--accent)] transition-colors"
                onClick={() => {
                  const next = Math.min(90, durations[p] + 1);
                  const d = { ...durations, [p]: next };
                  setDurations(d);
                  if (phase === p) setSeconds(next * 60);
                }}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
