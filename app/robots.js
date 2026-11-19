export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://gamedev.educalvolopez.com/sitemap.xml",
    host: "https://gamedev.educalvolopez.com",
  }
}
