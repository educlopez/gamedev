"use client"

import { useEffect, useState } from "react"
import Head from "next/head"
import { WORDS } from "@/games/wordsperminute/data"
import confetti from "canvas-confetti"

import DialogBox from "@/components/DialogBox"
import { Retrobutton } from "@/components/RetroBtn"
import { Text } from "@/components/Text"

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
        <meta name="description" content="Write as fast as you can" />
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

      <section className="flex flex-col items-center justify-center gap-5 my-10">
        {Boolean(time) && (
          <DialogBox className="w-auto text-center" message={word} clean />
        )}
        {time ? (
          <>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center gap-2"
            >
              <input
                type="text"
                value={buffer}
                autoFocus
                className=" flex h-8 w-full items-center gap-2 rounded-sm bg-gameboy-100 p-3 text-center text-sm text-gameboy-900 ring-1 ring-gameboy-700 transition placeholder:text-gameboy-700 hover:ring-gameboy-900 focus:[&:not(:focus-visible)]:outline-none"
                onChange={(e) => setBuffer(e.target.value)}
              />
              <Retrobutton className="mt-4" type="submit">
                Send
              </Retrobutton>
            </form>
            <DialogBox className="w-auto text-center">
              <p className="text-center text-gameboy-900">
                Characters typed: {characterCount} | Error count: {errorCount}
              </p>
              <p className="text-gameboy-900">Remaining time: {time}</p>
            </DialogBox>
          </>
        ) : (
          <>
            <DialogBox
              className="w-auto text-center"
              message="Write as fast as you can"
            />
            <Retrobutton
              onClick={() => {
                setTime(60)
                setCharacterCount(0)
                setErrorCount(0)
              }}
            >
              Play
            </Retrobutton>
          </>
        )}
      </section>
    </>
  )
}
