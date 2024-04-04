"use client"

import { useEffect, useState } from "react"
import Head from "next/head"
import confetti from "canvas-confetti"

import { Retrobutton } from "@/components/RetroBtn"
import { Text } from "@/components/Text"

const WORDS = [
  "Accio",
  "Expecto patronum",
  "Wingardium leviosa",
  "Avada kedavra",
  "Expelliarmus",
  "Lumos",
  "Nox",
  "Alohomora",
  "Imperio",
  "Stupefy",
  "Riddikulus",
  "Reducto",
  "Sectumsempra",
  "Sonorus",
  "Tarantallegra",
  "Verdimillious",
  "Bombarda",
  "Confringo",
  "Engorgio",
  "Evanesco",
  "Expulso",
  "Incendio",
  "Legilimens",
  "Obliviate",
  "Petrificus totalus",
  "Prior incantato",
  "Protego",
  "Reparo",
  "Rictusempra",
  "Crucio",
  "Diffindo",
  "Episkey",
  "Finite incantatem",
  "Geminio",
  "Homenum revelio",
  "Impedimenta",
  "Levicorpus",
  "Morsmordre",
  "Orchideous",
  "Portus",
  "Quietus",
  "Relashio",
  "Scourgify",
  "Tergeo",
  "Unbreakable vow",
  "Vulnera sanentur",
  "Waddiwasi",
  "Aparecium",
  "Brackium emendo",
  "Colloportus",
  "Deletrius",
  "Ennervate",
  "Ferula",
  "Glisseo",
  "Herbifors",
  "Incendio",
  "Jelly-legs jinx",
  "Knockback jinx",
  "Langlock",
  "Muffliato",
  "Nebulus",
  "Oculus reparo",
  "Piertotum locomotor",
  "Quidditch",
  "Rennervate",
  "Serpensortia",
  "Transmogrify",
  "Undetectable extension charm",
  "Vipera evanesca",
  "Wingardium leviosa",
  "Xenophilius lovegood",
  "Yaxley",
  "Zonko’s joke shop",
  "Aguamenti",
  "Bubble-head charm",
  "Caterwauling charm",
  "Densaugeo",
  "Erecto",
  "Flagrate",
  "Gouging spell",
  "Hurling hex",
  "Impervius",
  "Jinx",
  "Kreacher",
  "Liberacorpus",
  "Meteolojinx recanto",
  "Nogtail",
  "Obscuro",
  "Peskipiksi pesternomi",
  "Quaffle",
  "Rufus scrimgeour",
  "Silencio",
  "Tutshill tornados",
  "Unguentine",
  "Vera verto",
  "Weasley",
  "Xenophilius",
  "Yew",
  "Zabini",
  "Anteoculatia",
  "Bat-bogey hex",
  "Calvario",
  "Dissendium",
  "Everte statum",
  "Fidelius charm",
  "Geminio",
  "Homenum revelio",
  "Immobulus",
  "Jelly-fingers curse",
  "Knut",
  "Locomotor mortis",
  "Mobiliarbus",
  "Nimbus",
  "Obliteration charm",
  "Piscifors",
  "Quirinus quirrell",
  "Rictusempra",
  "Slugulus eructo",
  "Tentaclifors",
  "Unicorn",
  "Vipera evanesca",
  "Waddiwasi",
  "Xenophilius lovegood",
  "Yew",
]

export default function WordPerMinute() {
  const [word, setWord] = useState(
    () => WORDS[(Math.random() * WORDS.length) | 0]
  )
  const [characterCount, setCharacterCount] = useState(0)
  const [buffer, setBuffer] = useState("")
  const [time, setTime] = useState(0)
  const [errorCount, setErrorCount] = useState(0)

  function handleSubmit(event) {
    event.preventDefault()

    if (buffer === word) {
      setWord(WORDS[(Math.random() * WORDS.length) | 0])
      setCharacterCount((characterCount) => characterCount + word.length)
    } else {
      setErrorCount(errorCount + 1)
    }

    setBuffer("")
  }
  useEffect(() => {
    if (time !== 0) {
      const timeout = setTimeout(() => setTime(time - 1), 1000)
      return () => clearTimeout(timeout)
    }
    if (time === 0 && characterCount > 0) {
      confetti({
        particleCount: 100,
        spread: 360,
        colors: ["#8D9571", "#1F1F1F", "#4E533E"],
      })
    }
  }, [time, characterCount])

  return (
    <>
      <Head>
        <title>Words per minute</title>
        <meta name="description" content="" />
        <meta
          name="keywords"
          content="Words per minute, online game, tailwind css, next.js, web game"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Text
        title="Words per minute"
        as="h2"
        size="h2"
        className="fade-down-ct"
      />

      <section className="my-10 flex flex-col items-center justify-center gap-5">
        <p className="text-center text-gameboy-900">
          Characters typed: {characterCount} | Error count: {errorCount}
        </p>
        {Boolean(time) && (
          <p className="rounded-sm bg-gameboy-100 p-2 font-sans text-gameboy-900">
            {word}
          </p>
        )}
        <p className="text-gameboy-900">Remaining time: {time}</p>
        {time ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={buffer}
                autoFocus
                className=" flex h-8 w-full items-center gap-2 rounded-sm bg-gameboy-100 p-3 text-center text-sm text-gameboy-900 ring-1 ring-gameboy-700 transition placeholder:text-gameboy-700 hover:ring-gameboy-900 focus:[&:not(:focus-visible)]:outline-none"
                onChange={(e) => setBuffer(e.target.value)}
              />
            </form>
            <Retrobutton type="submit">Send</Retrobutton>
          </div>
        ) : (
          <Retrobutton
            onClick={() => {
              setTime(60)
              setCharacterCount(0)
              setErrorCount(0)
            }}
          >
            Play
          </Retrobutton>
        )}
      </section>
    </>
  )
}
