export default async function sitemap() {
  const routes = [
    "",
    "/games/tictactoe",
    "/games/memotest",
    "/games/wordsperminute",
    "/games/whoisthatpokemon",
    "/games/wordle",
  ].map((route) => ({
    url: `https://gamedev.educalvolopez.com${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }))

  return [...routes]
}
