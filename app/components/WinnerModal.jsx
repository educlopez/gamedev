import { Retrobutton } from "./RetroBtn.jsx"
import { Square } from "./Square.jsx"
import { Text } from "./Text.jsx"

export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null
  const winnerText = winner === false ? "Tie" : "Winner!"
  return (
    <>
      <div className="relative z-10">
        <div className="fixed inset-0 transition-opacity bg-gameboy-900/30 backdrop-blur-sm" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <div className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform border rounded-lg shadow-xl pixel-bg bg-gameboy-400 sm:w-full border-gameboy-400 sm:my-8 sm:max-w-sm sm:p-6">
              <div>
                <div className="text-center">
                  <Text
                    title={winnerText}
                    as="p"
                    size="medium"
                    className="mb-2"
                  />

                  <div className="flex justify-center">
                    {winner && <Square>{winner}</Square>}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <Retrobutton
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium shadow-sm sm:text-sm"
                  onClick={resetGame}
                >
                  Reset Game
                </Retrobutton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
