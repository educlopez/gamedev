import { useState } from 'react'
import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'

import { Square } from './components/Square.jsx'
import { TURNS, FADE_DOWN_ANIMATION_VARIANTS } from './constants.js';
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'
import bgRayDark from './images/bg-ray-dark.png';

function App () {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    // no actualizamos esta posición
    // si ya tiene algo
    if (board[index] || winner) return
    // actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // guardar aqui partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }

  return (
    <main className="board">
      <img
        src={bgRayDark}
        alt="Background ray for dark mode"
        className="absolute top-0 left-1/2 -ml-[39rem] hidden w-[113.125rem] max-w-none dark:block"
      />
      <motion.h1 className="text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
        Tic tac toe
      </motion.h1>
      <motion.button
        onClick={resetGame}
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        Reset del juego
      </motion.button>
      <motion.section className="game" variants={FADE_DOWN_ANIMATION_VARIANTS}>
        {board.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              {square}
            </Square>
          );
        })}
      </motion.section>

      <motion.section className="turn" variants={FADE_DOWN_ANIMATION_VARIANTS}>
        <Square
          isSelected={turn === TURNS.X}
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          {TURNS.X}
        </Square>
        <Square
          isSelected={turn === TURNS.O}
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          {TURNS.O}
        </Square>
      </motion.section>
      <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
        <WinnerModal resetGame={resetGame} winner={winner} />
      </motion.div>
    </main>
  );
}

export default App
