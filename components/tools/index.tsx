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

// New tools
import UrlEncoder from "./UrlEncoder";
import CaseConverter from "./CaseConverter";
import LoremIpsum from "./LoremIpsum";
import HtmlEntities from "./HtmlEntities";
import HashGenerator from "./HashGenerator";
import EpochConverter from "./EpochConverter";
import DiffChecker from "./DiffChecker";
import UserAgentParser from "./UserAgentParser";
import TextToSlug from "./TextToSlug";
import SqlFormatter from "./SqlFormatter";
import CssMinifier from "./CssMinifier";
import JsMinifier from "./JsMinifier";
import HexToRgb from "./HexToRgb";
import BinaryConverter from "./BinaryConverter";
import RegexTester from "./RegexTester";
import QrCodeGenerator from "./QrCodeGenerator";
import JsonToYaml from "./JsonToYaml";
import YamlToJson from "./YamlToJson";
import XmlToJson from "./XmlToJson";
import ImageMetaExtractor from "./ImageMetaExtractor";

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
  
  // New tools mappings
  "url-encoder": UrlEncoder,
  "case-converter": CaseConverter,
  "lorem-ipsum": LoremIpsum,
  "html-entities": HtmlEntities,
  "hash-generator": HashGenerator,
  "epoch-converter": EpochConverter,
  "diff-checker": DiffChecker,
  "user-agent-parser": UserAgentParser,
  "text-to-slug": TextToSlug,
  "sql-formatter": SqlFormatter,
  "css-minifier": CssMinifier,
  "js-minifier": JsMinifier,
  "hex-to-rgb": HexToRgb,
  "binary-converter": BinaryConverter,
  "regex-tester": RegexTester,
  "qr-code-generator": QrCodeGenerator,
  "json-to-yaml": JsonToYaml,
  "yaml-to-json": YamlToJson,
  "xml-to-json": XmlToJson,
  "image-meta-extractor": ImageMetaExtractor,
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
