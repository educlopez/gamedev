export function checkGuess(guess, targetWord) {
  const result = Array(guess.length).fill("absent")
  const targetLetters = targetWord.toLowerCase().split("")

  // First pass: mark correct letters
  for (let i = 0; i < guess.length; i++) {
    if (guess[i].toLowerCase() === targetLetters[i]) {
      result[i] = "correct"
      targetLetters[i] = null
    }
  }

  // Second pass: mark present letters
  for (let i = 0; i < guess.length; i++) {
    if (result[i] === "correct") continue
    const index = targetLetters.indexOf(guess[i].toLowerCase())
    if (index !== -1) {
      result[i] = "present"
      targetLetters[index] = null
    }
  }

  return result
}
