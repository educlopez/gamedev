import { motion } from 'framer-motion';
import {FADE_UP_ANIMATION_VARIANTS} from '../constants'
export const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `w-30 h-30 bg-zinc-900 border border-zinc-700 square ${isSelected ? 'bg-amber-500' : ''}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <motion.div
      onClick={handleClick}
      className={className}
      variants={FADE_UP_ANIMATION_VARIANTS}
    >
      {children}
    </motion.div>
  );
};
