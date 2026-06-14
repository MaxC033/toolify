# Toolify — Free Online Tools

A collection of free, fast, privacy-first tools for developers, writers, and designers. No login required. All tools run in your browser.

🌐 **Live site**: https://toolify.vercel.app

## 🛠 Tools Included

| Tool | Slug |
|------|------|
| Password Generator | `/tools/password-generator` |
| Word Counter | `/tools/word-counter` |
| Readability Checker | `/tools/readability-checker` |
| Color Palette Generator | `/tools/color-palette-generator` |
| Pomodoro Timer | `/tools/pomodoro-timer` |
| UUID Generator | `/tools/uuid-generator` |
| Base64 Encoder/Decoder | `/tools/base64-encoder` |
| JSON Formatter | `/tools/json-formatter` |
| Markdown Preview | `/tools/markdown-preview` |
| CSS Gradient Generator | `/tools/css-gradient-generator` |

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Custom CSS
- **AI**: Google Gemini Flash API (Free Tier)
- **Deployment**: Vercel (free Hobby plan)
- **Analytics**: Vercel Analytics
- **SEO**: next-sitemap, JSON-LD schema, OpenGraph

## ⚙️ Development

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/toolify.git
cd toolify

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your GEMINI_API_KEY

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🌍 Deployment (Vercel)

1. Push to GitHub
2. Connect repo at [vercel.com](https://vercel.com)
3. Set environment variables in Vercel dashboard
4. Deploy automatically on every push to `main`

Or use Vercel CLI:
```bash
npx vercel --prod
```

## 🤖 Agent Automation Tasks

The following tasks are designed to be executed by AI agents without human intervention:

```bash
# Generate weekly SEO report
npx tsx scripts/seo-report.ts

# Generate sitemap (runs automatically after build)
npm run build
```

## 📊 SEO Reports

Reports are automatically generated every Monday via GitHub Actions and saved to `reports/`.

## 📁 Project Structure

```
toolify/
├── app/
│   ├── layout.tsx           # Root layout + metadata
│   ├── page.tsx             # Homepage (tool directory)
│   ├── about/page.tsx       # About page
│   └── tools/[slug]/
│       └── page.tsx         # Dynamic tool pages
├── components/
│   ├── ToolShell.tsx        # Shared tool page layout
│   ├── FAQ.tsx              # FAQ accordion
│   └── tools/
│       ├── index.tsx        # Tool registry
│       ├── PasswordGenerator.tsx
│       ├── WordCounter.tsx
│       ├── ColorPaletteGenerator.tsx
│       ├── PomodoroTimer.tsx
│       ├── ReadabilityChecker.tsx
│       ├── UUIDGenerator.tsx
│       ├── Base64Tool.tsx
│       ├── JsonFormatter.tsx
│       ├── MarkdownPreview.tsx
│       └── CssGradientGenerator.tsx
├── data/
│   └── tools.json           # Tool metadata (SEO, FAQ, etc.)
├── scripts/
│   └── seo-report.ts        # Weekly automated SEO report
├── types/
│   └── tool.ts              # TypeScript types
├── .github/workflows/
│   ├── deploy.yml           # Auto-deploy on push
│   └── weekly-report.yml    # Weekly SEO cron job
├── next-sitemap.config.js   # Sitemap config
└── .env.example             # Environment variable template
```

## 🔑 Environment Variables

See `.env.example` for all required variables.

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes (for reports) | Google Gemini API key (free tier) |
| `SITE_URL` | No | Production URL (default: https://toolify.vercel.app) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Google Search Console verification |

## 📈 Adding a New Tool

1. Add an entry to `data/tools.json`
2. Create `components/tools/YourTool.tsx`
3. Register it in `components/tools/index.tsx`
4. Push to `main` — deploys automatically

## 📄 License

MIT — free to use, fork, and build upon.
