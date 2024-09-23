import { checkGuess } from "../../../utils/wordleUtils"

// interface WordleGridProps {
//   guesses: string[]
//   currentGuess: string
//   targetWord: string
// }

export default function WordleGrid({ guesses, currentGuess, targetWord }) {
  const emptyRows = Array(6 - guesses.length - 1).fill("")

  return (
    <div className="grid grid-cols-5 gap-1">
      {guesses.map((guess, i) => (
        <Row key={i} word={guess} targetWord={targetWord} />
      ))}
      {guesses.length < 6 && (
        <Row word={currentGuess} targetWord={targetWord} current />
      )}
      {emptyRows.map((_, i) => (
        <Row key={i + guesses.length} word="" targetWord={targetWord} />
      ))}
    </div>
  )
}

// interface RowProps {
//   word: string
//   targetWord: string
//   current?: boolean
// }

function Row({ word, targetWord, current = false }) {
  const tiles = word.padEnd(5, " ").split("")
  const statuses = checkGuess(word, targetWord)

  return (
    <>
      {tiles.map((char, i) => (
        <Tile key={i} char={char} status={current ? "current" : statuses[i]} />
      ))}
    </>
  )
}

// interface TileProps {
//   char: string
//   status: 'correct' | 'present' | 'absent' | 'empty' | 'current'
// }

function Tile({ char, status }) {
  const baseClasses =
    "w-12 h-12 border-2 flex items-center justify-center text-2xl font-bold"
  const statusClasses = {
    correct: "bg-green-500 border-green-600",
    present: "bg-yellow-500 border-yellow-600",
    absent: "bg-gray-500 border-gray-600",
    empty: "border-gameboy-400",
    current: "border-gameboy-700",
  }

  return (
    <div className={`${baseClasses} ${statusClasses[status]}`}>
      {char !== " " && char}
    </div>
  )
}
