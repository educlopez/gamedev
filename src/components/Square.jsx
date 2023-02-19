import { motion } from 'framer-motion'

import { FADE_UP_ANIMATION_VARIANTS } from '../lib/constants'

export const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `w-20 h-20 shadow-xl shadow-slate-900/10 rounded-md grid place-items-center text-4xl ${
    isSelected
      ? 'bg-gameboy-400 ring-gameboy-700 dark:bg-gameboy-400 dark:ring-gameboy-100  ring-inset ring-2'
      : 'bg-gameboy-100 dark:bg-gameboy-700'
  }`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <motion.div
      onClick={handleClick}
      className={className}
      variants={FADE_UP_ANIMATION_VARIANTS}
    >
      {children}
    </motion.div>
  )
}
