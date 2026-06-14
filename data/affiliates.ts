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
      href: "https://1password.com",   // Replace with affiliate URL
      badge: "Free Trial",
      logo: "🔑",
    },
    {
      label: "Bitwarden",
      description: "Open-source password manager. Free tier available.",
      href: "https://bitwarden.com",  // Replace with affiliate URL
      badge: "Free",
      logo: "🛡️",
    },
  ],
  "word-counter": [
    {
      label: "Grammarly",
      description: "AI-powered writing assistant that checks grammar, tone, and clarity.",
      href: "https://grammarly.com",  // Replace with affiliate URL
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
};
