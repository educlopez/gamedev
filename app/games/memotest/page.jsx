"use client"

import { useEffect, useState } from "react"
import Head from "next/head"
import Image from "next/image"
import { cards } from "@/games/memotest/data"
import confetti from "canvas-confetti"

import DialogBox from "@/components/DialogBox"
import { Retrobutton } from "@/components/RetroBtn"
import { Text } from "@/components/Text"

const flatCards = cards.flatMap((image) => [`a|${image.src}`, `b|${image.src}`])
const IMAGES = flatCards.sort(() => Math.random() - 0.5)

function Memotest() {
  const [guessed, setGuessed] = useState([])
  const [selected, setSelected] = useState([])
  const [isGameWon, setIsGameWon] = useState(false)

  useEffect(() => {
    if (selected.length === 2) {
      const [firstImage, secondImage] = selected

      if (firstImage.split("|")[1] === secondImage.split("|")[1]) {
        setGuessed((guessed) => guessed.concat(selected))
      }

      setTimeout(() => {
        setSelected([])
      }, 1000)
    }
  }, [selected])

  useEffect(() => {
    if (guessed.length === IMAGES.length) {
      setIsGameWon(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          y: 0.6,
        },
        colors: ["#8D9571", "#1F1F1F", "#4E533E"],
      })
    }
  }, [guessed])

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }

  const handleReset = () => {
    setGuessed([])
    setSelected([])
    setIsGameWon(false)
    shuffle(IMAGES)
  }
  return (
    <>
      <Head>
        <title>MemoTest</title>
        <meta name="description" content="" />
        <meta
          name="keywords"
          content="memotest, online game, tailwind css, next.js, web game"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Text title="MemoTest" as="h2" size="h2" className="fade-down-ct" />

      <section className="flex justify-center my-10">
        {isGameWon ? (
          <div className="flex flex-col items-center justify-center">
            <DialogBox
              as="p"
              className="text-gameboy-900"
              message="Congratulations! You won the game."
            />
            <Retrobutton className="mt-4" onClick={handleReset}>
              Reset Game
            </Retrobutton>
          </div>
        ) : (
          <ul className="grid grid-cols-4">
            {IMAGES.map((image) => {
              const [, url] = image.split("|")

              return (
                <li
                  key={image}
                  className="p-2 m-1 rounded-md cursor-pointer bg-gameboy-100 hover:bg-gameboy-400"
                  onClick={() =>
                    selected.length < 2 &&
                    setSelected((selected) => selected.concat(image))
                  }
                >
                  {selected.includes(image) || guessed.includes(image) ? (
                    <Image
                      src={url}
                      alt="surprise"
                      width={64}
                      height={64}
                      priority
                    />
                  ) : (
                    <svg
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-16 h-16 text-gameboy-900"
                    >
                      <path
                        d="M6 2h8v2H6V2zM4 6V4h2v2H4zm0 8H2V6h2v8zm2 2H4v-2h2v2zm8 0v2H6v-2h8zm2-2h-2v2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2zm0-8h2v8h-2V6zm0 0V4h-2v2h2z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </>
  )
}

export default Memotest
