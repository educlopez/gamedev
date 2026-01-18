import type { ReactNode } from "react";

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
        <div className="fixed inset-0 bg-gameboy-900/50 transition-opacity" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div className="pixel-bg relative transform overflow-hidden border-4 border-gameboy-900 bg-gameboy-100 px-6 pt-6 pb-6 text-left shadow-[0_8px_16px_rgba(7,24,33,0.4),inset_2px_2px_0_var(--color-gameboy-200)] transition-all sm:my-8 sm:w-full sm:max-w-sm">
              <div className="text-center">
                <Text
                  as="p"
                  className="mb-4 text-gameboy-900"
                  size="medium"
                  title={String(titleTop)}
                />

                <div className="mb-6 flex justify-center">{children}</div>
              </div>
              <div className="mt-6">
                <button
                  className="w-full border-4 border-gameboy-900 bg-gameboy-100 px-6 py-3 font-bold text-gameboy-900 shadow-[inset_-3px_-3px_0_var(--color-gameboy-700),inset_3px_3px_0_var(--color-gameboy-400),0_2px_4px_rgba(7,24,33,0.2)] transition-all hover:bg-gameboy-200 hover:shadow-[inset_-4px_-4px_0_var(--color-gameboy-700),inset_4px_4px_0_var(--color-gameboy-400)] focus:outline-none focus:ring-4 focus:ring-gameboy-400 focus:ring-offset-2 active:shadow-[inset_2px_2px_0_var(--color-gameboy-700),inset_-2px_-2px_0_var(--color-gameboy-400)]"
                  onClick={reset}
                  type="button"
                >
                  Reset Game
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
