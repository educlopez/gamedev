import { createContext, Fragment, useContext } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { motion } from "framer-motion"
import { create } from "zustand"

import { Header } from "@/components/Header"
import { Navigation } from "@/components/Navigation"

function MenuIcon(props) {
  return (
    <svg
      viewBox="0 0 10 9"
      fill="none"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M.5 1h9M.5 8h9M.5 4.5h9" />
    </svg>
  )
}

function XIcon(props) {
  return (
    <svg
      viewBox="0 0 10 9"
      fill="none"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m1.5 1 7 7M8.5 1l-7 7" />
    </svg>
  )
}

const IsInsideMobileNavigationContext = createContext(false)

export function useIsInsideMobileNavigation() {
  return useContext(IsInsideMobileNavigationContext)
}

export const useMobileNavigationStore = create((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))

export function MobileNavigation() {
  let isInsideMobileNavigation = useIsInsideMobileNavigation()
  let { isOpen, toggle, close } = useMobileNavigationStore()
  let ToggleIcon = isOpen ? XIcon : MenuIcon

  return (
    <IsInsideMobileNavigationContext.Provider value={true}>
      <button
        type="button"
        className="flex items-center justify-center w-6 h-6 transition rounded-md hover:bg-gameboy-900"
        aria-label="Toggle navigation"
        onClick={toggle}
      >
        <ToggleIcon className="w-6 stroke-2 stroke-gameboy-900" />
      </button>
      {!isInsideMobileNavigation && (
        <Transition.Root show={isOpen} as={Fragment}>
          <Dialog onClose={close} className="fixed inset-0 z-50 lg:hidden">
            <Dialog.Panel>
              <Transition.Child
                as={Fragment}
                enter="duration-300 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="duration-200 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Header />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="duration-500 ease-in-out"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="duration-500 ease-in-out"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <motion.div
                  layoutScroll
                  className="fixed left-0 top-0 pt-24 bottom-0 w-full overflow-y-auto bg-gameboy-100 px-4 pb-4 shadow-lg shadow-gameboy-900 ring-1 ring-zinc-900/7.5 min-[416px]:max-w-sm sm:px-6 sm:pb-10 pixel-bg"
                >
                  <Navigation onClick={close} />
                </motion.div>
              </Transition.Child>
            </Dialog.Panel>
          </Dialog>
        </Transition.Root>
      )}
    </IsInsideMobileNavigationContext.Provider>
  )
}