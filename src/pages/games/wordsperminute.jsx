import { useEffect, useState } from 'react'
import Head from 'next/head'
import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'

import { FADE_DOWN_ANIMATION_VARIANTS } from '@/lib/constants.js'
import { Button } from '@/components/Button'

const WORDS = [
  'Accio',
  'Expecto patronum',
  'Wingardium leviosa',
  'Avada kedavra',
  'Expelliarmus',
  'Lumos',
  'Nox',
  'Alohomora',
  'Imperio',
  'Stupefy',
  'Riddikulus',
  'Reducto',
  'Sectumsempra',
  'Sonorus',
  'Tarantallegra',
  'Verdimillious',
  'Bombarda',
  'Confringo',
  'Engorgio',
  'Evanesco',
  'Expulso',
  'Incendio',
  'Legilimens',
  'Obliviate',
  'Petrificus totalus',
  'Prior incantato',
  'Protego',
  'Reparo',
  'Rictusempra',
]

export default function WordPerMinute() {
  const [word, setWord] = useState(
    () => WORDS[(Math.random() * WORDS.length) | 0]
  )
  const [characterCount, setCharacterCount] = useState(0)
  const [buffer, setBuffer] = useState('')
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

    setBuffer('')
  }
  useEffect(() => {
    if (time !== 0) {
      const timeout = setTimeout(() => setTime(time - 1), 1000)
      return () => clearTimeout(timeout)
    }
    if (time === 0 && characterCount > 0) {
      confetti({ particleCount: 100, spread: 360 })
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
      <motion.h1
        className="text-xl font-bold text-center md:text-6xl text-gameboy-900 dark:text-gameboy-400"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        Words per minute
      </motion.h1>

      <motion.section
        className="flex flex-col items-center justify-center gap-5 my-10"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <p className="text-center text-gameboy-700 dark:text-gameboy-400">
          Characters typed: {characterCount} | Error count: {errorCount}
        </p>
        {Boolean(time) && (
          <p className="p-2 font-sans rounded-sm text-gameboy-700 dark:text-gameboy-400 bg-gameboy-100 dark:bg-gameboy-700">
            {word}
          </p>
        )}
        <p className="text-gameboy-700 dark:text-gameboy-400">
          Remaining time: {time}
        </p>
        {time ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={buffer}
                autoFocus
                className=" placeholder:text-gameboy-700 dark:placeholder:text-gameboy-400 h-8 w-full items-center gap-2 rounded-sm bg-gameboy-400 p-3 text-sm text-center text-gameboy-900 ring-1 ring-gameboy-700 transition hover:ring-gameboy-900 dark:bg-gameboy-700 dark:text-gameboy-100 dark:ring-inset dark:ring-gameboy-400 dark:hover:ring-gameboy-100 flex focus:[&:not(:focus-visible)]:outline-none"
                onChange={(e) => setBuffer(e.target.value)}
              />
            </form>
            <Button type="submit">Send</Button>
          </div>
        ) : (
          <Button
            onClick={() => {
              setTime(60)
              setCharacterCount(0)
              setErrorCount(0)
            }}
          >
            Play
          </Button>
        )}
      </motion.section>
    </>
  )
}
