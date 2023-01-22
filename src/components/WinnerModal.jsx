import { Square } from './Square.jsx';
import { Button } from './Button.jsx';

export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null;
  const winnerText = winner === false ? 'Tie' : 'Winner!';
  return (
    <>
      <div
        className="relative z-10"
      >
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 transition-opacity backdrop-blur-sm dark:backdrop-blur" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="sm:w-full relative transform overflow-hidden rounded-lg bg-white dark:border dark:border-zinc-900 dark:bg-black px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div>
                <div className="text-center">
                  <p className="text-lg text-zinc-500 dark:text-white font-medium mb-3">
                    {winnerText}
                  </p>
                  <div className="flex justify-center">
                    {winner && <Square>{winner}</Square>}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <Button
                  type="button"
                  className="inline-flex w-full justify-center  px-4 py-2 text-base font-medium shadow-sm sm:text-sm"
                  onClick={resetGame}
                >
                  Reset Game
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
