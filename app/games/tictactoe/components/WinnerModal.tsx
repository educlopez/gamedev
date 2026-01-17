import { Retrobutton } from "../../../components/RetroBtn";
import { Text } from "../../../components/Text";
import { Square } from "./Square";

type WinnerModalProps = {
  winner: string | null | false;
  resetGame: () => void;
};

export function WinnerModal({ winner, resetGame }: WinnerModalProps) {
  if (winner === null) return null;
  const winnerText = winner === false ? "Tie" : "Winner!";
  return (
    <>
      <div className="relative z-10">
        <div className="fixed inset-0 bg-gameboy-900/30 backdrop-blur-xs transition-opacity" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="pixel-bg relative transform overflow-hidden rounded-lg border border-gameboy-400 bg-gameboy-400 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div>
                <div className="text-center">
                  <Text
                    as="p"
                    className="mb-2"
                    size="medium"
                    title={winnerText}
                  />

                  <div className="flex justify-center">
                    {winner && <Square>{winner}</Square>}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <Retrobutton
                  className="inline-flex w-full justify-center px-4 py-2 font-medium text-base shadow-xs sm:text-sm"
                  onClick={resetGame}
                  type="button"
                >
                  Reset Game
                </Retrobutton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
