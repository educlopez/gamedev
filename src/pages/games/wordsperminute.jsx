import { useEffect, useState } from 'react';
import Head from 'next/head';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';



import { FADE_DOWN_ANIMATION_VARIANTS } from '@/lib/constants.js';
import { Text } from '@/components/Text';
import { Retrobutton } from '@/components/RetroBtn';


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
      confetti({
        particleCount: 100,
        spread: 360,
        colors: ['#8D9571', '#1F1F1F', '#4E533E'],
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
      <motion.div
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <Text title="Words per minute" as='h2' size='h2'/>
      </motion.div>
      <motion.section
        className="flex flex-col items-center justify-center gap-5 my-10"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <p className="text-center text-gameboy-900">
          Characters typed: {characterCount} | Error count: {errorCount}
        </p>
        {Boolean(time) && (
          <p className="p-2 font-sans rounded-sm text-gameboy-900 bg-gameboy-100">
            {word}
          </p>
        )}
        <p className="text-gameboy-900">
          Remaining time: {time}
        </p>
        {time ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={buffer}
                autoFocus
                className=" placeholder:text-gameboy-700 h-8 w-full items-center gap-2 rounded-sm bg-gameboy-100 p-3 text-sm text-center text-gameboy-900 ring-1 ring-gameboy-700 transition hover:ring-gameboy-900 flex focus:[&:not(:focus-visible)]:outline-none"
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
      </motion.section>
    </>
  )
}