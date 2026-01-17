import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: "https://gamedev.educalvolopez.com/sitemap.xml",
    host: "https://gamedev.educalvolopez.com",
  };
}
