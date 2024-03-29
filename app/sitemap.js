export default async function sitemap() {
  const routes = ["", "/games"].map((route) => ({
    url: `https://gamedev.educalvolopez.com${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }))

  return [...routes]
}
