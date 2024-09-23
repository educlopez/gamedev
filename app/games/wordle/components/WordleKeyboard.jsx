import { checkGuess } from "../../../utils/wordleUtils"

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
]

// interface WordleKeyboardProps {
//   onKeyPress: (key: string) => void
//   guesses: string[]
//   targetWord: string
// }

export default function WordleKeyboard({ onKeyPress, guesses, targetWord }) {
  const getKeyStatus = (key) => {
    let status = "unused"
    for (const guess of guesses) {
      const statuses = checkGuess(guess, targetWord)
      const index = guess.toUpperCase().indexOf(key)
      if (index !== -1) {
        if (statuses[index] === "correct") return "correct"
        if (statuses[index] === "present") status = "present"
        if (statuses[index] === "absent" && status === "unused")
          status = "absent"
      }
    }
    return status
  }

  return (
    <div className="flex flex-col items-center gap-1">
      {KEYS.map((row, i) => (
        <div key={i} className="flex gap-1">
          {row.map((key) => (
            <Key
              key={key}
              keyValue={key}
              onClick={() => onKeyPress(key)}
              status={getKeyStatus(key)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

// interface KeyProps {
//   keyValue: string
//   onClick: () => void
//   status: 'unused' | 'correct' | 'present' | 'absent'
// }

function Key({ keyValue, onClick, status }) {
  const baseClasses = "px-2 py-3 rounded font-bold cursor-pointer"
  const statusClasses = {
    unused: "bg-gameboy-400 text-gameboy-900",
    correct: "bg-green-500 text-white",
    present: "bg-yellow-500 text-white",
    absent: "bg-gray-500 text-white",
  }

  return (
    <button
      className={`${baseClasses} ${statusClasses[status]}`}
      onClick={onClick}
    >
      {keyValue === "Backspace" ? "←" : keyValue}
    </button>
  )
}
