"use client"

import Head from "next/head"
import Image from "next/image"
import { IMAGES } from "@/games/memotest/data"

import DialogBox from "@/components/DialogBox"
import { Modal } from "@/components/Modal"
import { Retrobutton } from "@/components/RetroBtn"
import { Text } from "@/components/Text"

import { useGameState } from "./components/useGameState"

export default function Memotest() {
  const { guessed, selected, isGameWon, time, play, setSelected, handleReset } =
    useGameState()

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
        {time !== 0 && play == false && (
          <div className="flex flex-col items-center gap-5">
            <DialogBox
              className="w-auto text-center"
              message="Write as fast as you can"
            />
            <Retrobutton onClick={handleReset} className="flex w-auto">
              Play
            </Retrobutton>
          </div>
        )}
        {play && (
          <>
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
              <ul className="grid grid-cols-4 gap-1">
                {IMAGES.map((image) => {
                  const [, url] = image.split("|")

                  return (
                    <li
                      key={image}
                      className="p-2 cursor-pointer select-none bg-gameboy-100 hover:bg-gameboy-400"
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
          </>
        )}
      </section>

      <section className="flex justify-center">
        {play == true && (
          <DialogBox
            className="w-auto text-center text-gameboy-900"
            message={`Remaining time: ${time}`}
          />
        )}

        {time === 0 && <Modal titleTop="Game Over" reset={handleReset} />}
      </section>
    </>
  )
}
