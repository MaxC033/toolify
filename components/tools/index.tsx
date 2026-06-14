"use client";

import PasswordGenerator from "./PasswordGenerator";
import WordCounter from "./WordCounter";
import ColorPaletteGenerator from "./ColorPaletteGenerator";
import PomodoroTimer from "./PomodoroTimer";
import ReadabilityChecker from "./ReadabilityChecker";
import UUIDGenerator from "./UUIDGenerator";
import Base64Tool from "./Base64Tool";
import JsonFormatter from "./JsonFormatter";
import MarkdownPreview from "./MarkdownPreview";
import CssGradientGenerator from "./CssGradientGenerator";

const toolMap: Record<string, React.ComponentType> = {
  "password-generator": PasswordGenerator,
  "word-counter": WordCounter,
  "color-palette-generator": ColorPaletteGenerator,
  "pomodoro-timer": PomodoroTimer,
  "readability-checker": ReadabilityChecker,
  "uuid-generator": UUIDGenerator,
  "base64-encoder": Base64Tool,
  "json-formatter": JsonFormatter,
  "markdown-preview": MarkdownPreview,
  "css-gradient-generator": CssGradientGenerator,
};

export function ToolUI({ slug }: { slug: string }) {
  const Component = toolMap[slug];
  if (!Component) {
    return (
      <div className="card p-10 text-center text-[var(--text-muted)]">
        🚧 Tool UI coming soon
      </div>
    );
  }
  return (
    <div className="card p-6 md:p-8">
      <Component />
    </div>
  );
}
