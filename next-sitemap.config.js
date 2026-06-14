/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://toolify.vercel.app",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
    ],
  },
  additionalPaths: async (config) => {
    const tools = require("./data/tools.json");
    return tools.map((tool) => ({
      loc: `/tools/${tool.slug}`,
      changefreq: "monthly",
      priority: 0.9,
      lastmod: new Date().toISOString(),
    }));
  },
};
