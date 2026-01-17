import type { ReactNode } from "react";

import { Retrobutton } from "./RetroBtn";
import { Text } from "./Text";

type ModalProps = {
  reset: () => void;
  children?: ReactNode;
  titleTop: ReactNode;
};

export function Modal({ reset, children, titleTop }: ModalProps) {
  return (
    <>
      <div className="relative z-10">
        <div className="fixed inset-0 bg-gameboy-900/30 backdrop-blur-xs transition-opacity" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div className="pixel-bg relative transform overflow-hidden rounded-lg border border-gameboy-400 bg-gameboy-400 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div>
                <div className="text-center">
                  <Text
                    as="p"
                    className="mb-2"
                    size="medium"
                    title={String(titleTop)}
                  />

                  <div className="flex justify-center">{children}</div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <Retrobutton
                  className="inline-flex w-full justify-center px-4 py-2 font-medium text-base shadow-xs sm:text-sm"
                  onClick={reset}
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
