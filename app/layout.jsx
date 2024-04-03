import "./globals.css"
import "focus-visible"

import { Silkscreen } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"

import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import NoiseBackground from "@/components/NoiseBackground"

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--display-gameboy",
})

export const metadata = {
  metadataBase: new URL("https://gamedev.educalvolopez.com"),
  title: {
    default: "GameDev",
    template: "%s | GameDev",
  },
  description: `Discover a world of fun and challenge with our wide selection of mini-games. Play Who's That Pokemon, Memory, Tic Tac Toe, and more. Improve your cognitive skills and have fun at the same time. Play now!`,
  keywords: [
    `mini games, who's that pokemon, memory, tic tac toe, cognitive skills, fun, challenge, play now`,
  ],
  openGraph: {
    title: "GameDev",
    description: `Discover a world of fun and challenge with our wide selection of mini-games. Play Who's That Pokemon, Memory, Tic Tac Toe, and more. Improve your cognitive skills and have fun at the same time. Play now!`,
    url: "https://gamedev.educalvolopez.com",
    siteName: "GameDev",
    images: [
      {
        url: "https://gamedev.educalvolopez.com/og.jpg",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en_EN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "GameDev",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
}

export default function RootLayout({ children }) {
  return (
    <html className="h-full antialiased" lang="en">
      <body
        className={`flex flex-col h-full antialiased pixel-bg ${silkscreen.className}`}
      >
        <div className="fixed top-0 left-0 z-50 w-full h-screen pointer-events-none crt"></div>
        <NoiseBackground />
        <div className="relative overflow-scroll">
          <Header />
          <div className="relative max-w-2xl px-4 pb-16 mx-auto space-y-10 pt-14 sm:px-6 lg:px-8 lg:max-w-5xl">
            <main className="py-16">{children}</main>
            <Footer />
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
