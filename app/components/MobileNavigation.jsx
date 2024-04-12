import { createContext, Fragment, useContext } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { create } from "zustand"

import { Header } from "@/components/Header"
import { MenuIcon, XIcon } from "@/components/Icons"
import { Navigation } from "@/components/Navigation"
import { Retrobutton } from "@/components/RetroBtn"

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
  const isInsideMobileNavigation = useIsInsideMobileNavigation()
  let { isOpen, toggle, close } = useMobileNavigationStore()
  const ToggleIcon = isOpen ? XIcon : MenuIcon

  return (
    <IsInsideMobileNavigationContext.Provider value={true}>
      <Retrobutton
        type="button"
        className="flex items-center justify-center w-auto h-auto transition rounded-md hover:bg-gameboy-900"
        aria-label="Toggle navigation"
        onClick={toggle}
      >
        <ToggleIcon className="w-6 stroke-2 stroke-gameboy-900" />
      </Retrobutton>
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
                <div className="ring-zinc-900/7.5 pixel-bg fixed bottom-0 left-0 top-0 w-full overflow-y-auto bg-gameboy-100 px-4 pb-4 pt-24 shadow-lg shadow-gameboy-900 ring-1 min-[416px]:max-w-sm sm:px-6 sm:pb-10">
                  <Navigation onClick={close} />
                </div>
              </Transition.Child>
            </Dialog.Panel>
          </Dialog>
        </Transition.Root>
      )}
    </IsInsideMobileNavigationContext.Provider>
  )
}
