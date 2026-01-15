export function checkGuess(guess: string, targetWord: string): string[] {
  const result = Array(guess.length).fill('absent') as string[]
  const targetLetters = targetWord.toLowerCase().split('')

  // First pass: mark correct letters
  for (let i = 0; i < guess.length; i++) {
    if (guess[i].toLowerCase() === targetLetters[i]) {
      result[i] = 'correct'
      targetLetters[i] = ''
    }
  }

  // Second pass: mark present letters
  for (let i = 0; i < guess.length; i++) {
    if (result[i] === 'correct') continue
    const index = targetLetters.indexOf(guess[i].toLowerCase())
    if (index !== -1) {
      result[i] = 'present'
      targetLetters[index] = ''
    }
  }

  return result
}
