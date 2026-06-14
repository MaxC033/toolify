// Affiliate link registry
// Each tool slug maps to relevant affiliate recommendations.
// Replace the href values with your actual affiliate links.

export interface AffiliateLink {
  label: string;
  description: string;
  href: string;
  badge?: string;   // e.g. "Free Trial", "Popular", "30% Off"
  logo?: string;    // emoji fallback
}

export const affiliateLinks: Record<string, AffiliateLink[]> = {
  "password-generator": [
    {
      label: "1Password",
      description: "Best-in-class password manager for individuals & teams.",
      href: "https://1password.com",
      badge: "Free Trial",
      logo: "🔑",
    },
    {
      label: "Bitwarden",
      description: "Open-source password manager. Free tier available.",
      href: "https://bitwarden.com",
      badge: "Free",
      logo: "🛡️",
    },
  ],
  "word-counter": [
    {
      label: "Grammarly",
      description: "AI-powered writing assistant that checks grammar, tone, and clarity.",
      href: "https://grammarly.com",
      badge: "Free Plan",
      logo: "✏️",
    },
    {
      label: "ProWritingAid",
      description: "In-depth writing analysis for long-form content.",
      href: "https://prowritingaid.com",
      badge: "20% Off",
      logo: "📖",
    },
  ],
  "readability-checker": [
    {
      label: "Hemingway Editor",
      description: "Makes your writing bold and clear.",
      href: "https://hemingwayapp.com",
      badge: "Popular",
      logo: "📝",
    },
    {
      label: "Grammarly",
      description: "AI writing assistant with readability suggestions.",
      href: "https://grammarly.com",
      badge: "Free Plan",
      logo: "✏️",
    },
  ],
  "color-palette-generator": [
    {
      label: "Figma",
      description: "The industry-standard design tool. Free for individuals.",
      href: "https://figma.com",
      badge: "Free",
      logo: "🎨",
    },
    {
      label: "Adobe Color",
      description: "Professional color wheel and palette creation.",
      href: "https://color.adobe.com",
      badge: "Free",
      logo: "🖌️",
    },
  ],
  "css-gradient-generator": [
    {
      label: "Tailwind CSS",
      description: "Utility-first CSS framework with built-in gradient utilities.",
      href: "https://tailwindcss.com",
      badge: "Free",
      logo: "💨",
    },
    {
      label: "Framer",
      description: "No-code website builder with powerful CSS controls.",
      href: "https://framer.com",
      badge: "Free Plan",
      logo: "🖥️",
    },
  ],
  "json-formatter": [
    {
      label: "Postman",
      description: "API testing platform. Format JSON requests easily.",
      href: "https://postman.com",
      badge: "Free",
      logo: "📬",
    },
    {
      label: "VS Code",
      description: "Free code editor with built-in JSON formatting.",
      href: "https://code.visualstudio.com",
      badge: "Free",
      logo: "💻",
    },
  ],
  "uuid-generator": [
    {
      label: "Supabase",
      description: "Open-source Firebase alternative with UUID support out of the box.",
      href: "https://supabase.com",
      badge: "Free Tier",
      logo: "🗄️",
    },
    {
      label: "PlanetScale",
      description: "Serverless MySQL with auto-generated UUIDs.",
      href: "https://planetscale.com",
      badge: "Free Plan",
      logo: "🪐",
    },
  ],
  "markdown-preview": [
    {
      label: "Notion",
      description: "All-in-one workspace with Markdown support.",
      href: "https://notion.so",
      badge: "Free Plan",
      logo: "📒",
    },
    {
      label: "Obsidian",
      description: "Local-first Markdown knowledge base.",
      href: "https://obsidian.md",
      badge: "Free",
      logo: "🔮",
    },
  ],
  "pomodoro-timer": [
    {
      label: "Todoist",
      description: "Task management with Pomodoro integration.",
      href: "https://todoist.com",
      badge: "Free Plan",
      logo: "✅",
    },
    {
      label: "Forest App",
      description: "Stay focused and grow a virtual forest.",
      href: "https://forestapp.cc",
      badge: "Popular",
      logo: "🌳",
    },
  ],
  "base64-encoder": [
    {
      label: "Insomnia",
      description: "REST & GraphQL API client with encoding utilities.",
      href: "https://insomnia.rest",
      badge: "Free",
      logo: "😴",
    },
  ],
  "url-encoder": [
    {
      label: "Postman",
      description: "Streamline API development and test URL parameters.",
      href: "https://postman.com",
      badge: "Free Tool",
      logo: "📬",
    },
  ],
  "case-converter": [
    {
      label: "Grammarly",
      description: "Improve writing flow and fix typos instantly.",
      href: "https://grammarly.com",
      badge: "Free Plan",
      logo: "✏️",
    },
  ],
  "lorem-ipsum": [
    {
      label: "Figma",
      description: "Speed up layouts with Figma and placeholder texts.",
      href: "https://figma.com",
      badge: "Free",
      logo: "🎨",
    },
  ],
  "html-entities": [
    {
      label: "VS Code",
      description: "Code editor featuring standard entity auto-completions.",
      href: "https://code.visualstudio.com",
      badge: "Free",
      logo: "💻",
    },
  ],
  "hash-generator": [
    {
      label: "NordVPN",
      description: "Secure your online connections with a robust VPN.",
      href: "https://nordvpn.com",
      badge: "Save 60%",
      logo: "🛡️",
    },
  ],
  "epoch-converter": [
    {
      label: "Supabase",
      description: "Postgres database hosting supporting automatic epoch/date logic.",
      href: "https://supabase.com",
      badge: "Free Tier",
      logo: "🗄️",
    },
  ],
  "diff-checker": [
    {
      label: "GitKraken",
      description: "Visualize git history, branches, and diffs easily.",
      href: "https://gitkraken.com",
      badge: "Popular",
      logo: "🐙",
    },
  ],
  "user-agent-parser": [
    {
      label: "BrowserStack",
      description: "Test web layouts on 3000+ real browsers and mobile devices.",
      href: "https://browserstack.com",
      badge: "Free Trial",
      logo: "☁️",
    },
  ],
  "text-to-slug": [
    {
      label: "Hostinger",
      description: "Affordable shared web hosting with direct WordPress deployment.",
      href: "https://hostinger.com",
      badge: "70% Off",
      logo: "🌐",
    },
  ],
  "sql-formatter": [
    {
      label: "Supabase",
      description: "Instant Postgres hosting with built-in SQL query editor.",
      href: "https://supabase.com",
      badge: "Free Tier",
      logo: "🗄️",
    },
  ],
  "css-minifier": [
    {
      label: "Hostinger",
      description: "High-speed SSD hosting optimized for fast styles loading.",
      href: "https://hostinger.com",
      badge: "70% Off",
      logo: "⚡",
    },
  ],
  "js-minifier": [
    {
      label: "Vercel",
      description: "Fast frontend hosting with automatic JS bundle optimization.",
      href: "https://vercel.com",
      badge: "Free Plan",
      logo: "▲",
    },
  ],
  "hex-to-rgb": [
    {
      label: "Figma",
      description: "Collaborative design environment supporting hex/rgb/hsl conversions.",
      href: "https://figma.com",
      badge: "Free",
      logo: "🎨",
    },
  ],
  "binary-converter": [
    {
      label: "Coursera",
      description: "Learn Computer Science foundations and programming courses.",
      href: "https://coursera.org",
      badge: "Popular",
      logo: "🎓",
    },
  ],
  "regex-tester": [
    {
      label: "VS Code",
      description: "Code editor featuring powerful regex search and replace options.",
      href: "https://code.visualstudio.com",
      badge: "Free",
      logo: "💻",
    },
  ],
  "qr-code-generator": [
    {
      label: "Canva",
      description: "Easy design suite for prints, flyers, and branding media.",
      href: "https://canva.com",
      badge: "Free Plan",
      logo: "🖌️",
    },
  ],
  "json-to-yaml": [
    {
      label: "Postman",
      description: "API workspace supporting JSON to YAML payload tests.",
      href: "https://postman.com",
      badge: "Free",
      logo: "📬",
    },
  ],
  "yaml-to-json": [
    {
      label: "VS Code",
      description: "Code editor featuring JSON and YAML schema validation extensions.",
      href: "https://code.visualstudio.com",
      badge: "Free",
      logo: "💻",
    },
  ],
  "xml-to-json": [
    {
      label: "Postman",
      description: "Test SOAP/XML APIs and inspect responses in JSON.",
      href: "https://postman.com",
      badge: "Free",
      logo: "📬",
    },
  ],
  "image-meta-extractor": [
    {
      label: "Canva",
      description: "Visual editing suites and mockups using custom photos.",
      href: "https://canva.com",
      badge: "Free Plan",
      logo: "🖼️",
    },
  ]
};
