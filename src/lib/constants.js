export const TURNS = {
  // turnos
  X: '❌',
  O: '🟠',
}

export const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export const FADE_IN_ANIMATION_SETTINGS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 },
}

export const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' } },
}

export const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' } },
}

export const FADE_IN_ANIMATION_CARD = {
  initial: { opacity: 0, y: -10 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
}
export const FADE_IN_ANIMATION_CARD_HOVER = {
  initial: { opacity: 0, y: -10 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  viewport: { once: true },
}
