import { useEffect, useState } from "react"
import { IMAGES } from "@/games/memotest/data"
import confetti from "canvas-confetti"

export function useGameState() {
  const [guessed, setGuessed] = useState([])
  const [selected, setSelected] = useState([])
  const [play, setPlay] = useState(false)
  const [isGameWon, setIsGameWon] = useState(false)
  const [time, setTime] = useState(60)

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
  useEffect(() => {
    if (time !== 0 && play == true && !isGameWon) {
      const timeout = setTimeout(() => setTime(time - 1), 1000)
      return () => clearTimeout(timeout)
    }
  }, [time, isGameWon, play])

  const handleReset = () => {
    setGuessed([])
    setSelected([])
    setPlay(true)
    setIsGameWon(false)
    shuffle(IMAGES)
    setTime(60)
  }

  return {
    guessed,
    selected,
    isGameWon,
    time,
    play,
    setGuessed,
    setSelected,
    setIsGameWon,
    handleReset,
  }
}
