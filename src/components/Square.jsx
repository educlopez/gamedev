import { motion } from 'framer-motion'

import { FADE_UP_ANIMATION_VARIANTS } from '../lib/constants'

export const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `w-20 h-20 shadow-xl shadow-slate-900/10  rounded-md grid place-items-center text-4xl ${
    isSelected
      ? 'bg-orange-400/10 dark:ring-orange-400/50 ring-orange-400 ring-inset ring-1'
      : 'bg-white dark:bg-zinc-900'
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
