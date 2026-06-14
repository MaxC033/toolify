"use client";

import { useState } from "react";

function xmlToJson(xml: Node): any {
  let obj: any = {};

  if (xml.nodeType === 1) {
    // Element node
    const element = xml as Element;
    if (element.attributes.length > 0) {
      obj["@attributes"] = {};
      for (let j = 0; j < element.attributes.length; j++) {
        const attribute = element.attributes.item(j);
        if (attribute) {
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    }
  }

  // Child nodes
  if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i++) {
      const item = xml.childNodes.item(i);
      const nodeName = item.nodeName;

      // Ignore whitespace text nodes
      if (nodeName === "#text" && !item.nodeValue?.trim()) {
        continue;
      }

      if (nodeName === "#text") {
        obj = item.nodeValue;
        continue;
      }

      const child = xmlToJson(item);
      if (obj[nodeName] === undefined) {
        obj[nodeName] = child;
      } else {
        if (!Array.isArray(obj[nodeName])) {
          obj[nodeName] = [obj[nodeName]];
        }
        obj[nodeName].push(child);
      }
    }
  }

  // Handle case where object is empty but element had text content
  if (Object.keys(obj).length === 0) {
    return "";
  }

  return obj;
}

export default function XmlToJson() {
  const [xmlText, setXmlText] = useState("");
  const [jsonText, setJsonText] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");
    setJsonText("");
    if (!xmlText.trim()) return;

    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
      
      // Check for parsing errors
      const parseError = xmlDoc.getElementsByTagName("parsererror");
      if (parseError.length > 0) {
        throw new Error(parseError[0].textContent || "XML parse error");
      }

      const parsed = xmlToJson(xmlDoc.documentElement);
      const rootName = xmlDoc.documentElement.nodeName;
      
      // Nest within root tag name for standard structure
      const output = { [rootName]: parsed };
      setJsonText(JSON.stringify(output, null, 2));
    } catch (e: any) {
      setError(e.message || "Failed to parse XML. Make sure tags are balanced.");
    }
  };

  const handleCopy = () => {
    if (!jsonText) return;
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <textarea
        className="input w-full font-mono text-sm"
        rows={8}
        placeholder="Paste your XML document here…"
        value={xmlText}
        onChange={(e) => setXmlText(e.target.value)}
      />

      <div className="flex gap-3">
        <button className="btn" onClick={handleConvert}>
          Convert XML to JSON
        </button>
        {jsonText && (
          <>
            <button className="btn-secondary" onClick={handleCopy}>
              {copied ? "Copied! ✓" : "Copy to Clipboard"}
            </button>
            <button className="btn-secondary text-red-500" onClick={() => { setXmlText(""); setJsonText(""); }}>
              Clear
            </button>
          </>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-950/30 text-red-400 border-l-2 border-red-500 rounded text-sm font-mono break-all">
          ⚠️ {error}
        </div>
      )}

      {jsonText && (
        <div className="flex flex-col gap-2">
          <label className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider block">
            JSON Output
          </label>
          <pre className="input w-full font-mono text-sm whitespace-pre overflow-x-auto p-4 bg-[var(--surface-2)]">
            <code>{jsonText}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
