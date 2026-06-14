import { notFound } from "next/navigation";
import type { Metadata } from "next";
import toolsData from "@/data/tools.json";
import { affiliateLinks } from "@/data/affiliates";
import { ToolShell } from "@/components/ToolShell";
import { FAQ } from "@/components/FAQ";
import { ToolUI } from "@/components/tools";
import { AffiliateSection } from "@/components/AffiliateSection";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import type { Tool } from "@/types/tool";

const SITE_URL = process.env.SITE_URL || "https://toolify.vercel.app";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return toolsData.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolsData.find((t) => t.slug === slug) as Tool | undefined;
  if (!tool) return {};

  const ogUrl = `${SITE_URL}/api/og?slug=${tool.slug}`;

  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    openGraph: {
      title: `${tool.title} | Toolify`,
      description: tool.description,
      type: "website",
      url: `${SITE_URL}/tools/${tool.slug}`,
      images: [{ url: ogUrl, width: 1200, height: 630, alt: tool.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.title} | Toolify`,
      description: tool.description,
      images: [ogUrl],
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = toolsData.find((t) => t.slug === slug) as Tool | undefined;
  if (!tool) notFound();

  const toolAffiliates = affiliateLinks[tool.slug] ?? [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    description: tool.description,
    url: `${SITE_URL}/tools/${tool.slug}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <ToolShell tool={tool}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Tool */}
      <ToolUI slug={tool.slug} />

      {/* Affiliate recommendations */}
      <AffiliateSection links={toolAffiliates} toolTitle={tool.title} />

      {/* Mid-page ad (between tool and FAQ) */}
      <AdSenseBanner
        slot="1234567890"
        format="horizontal"
        className="mt-8"
      />

      {/* FAQ */}
      <FAQ items={tool.faqItems} />

      {/* Bottom ad */}
      <AdSenseBanner
        slot="0987654321"
        format="auto"
        className="mt-8"
      />
    </ToolShell>
  );
}
