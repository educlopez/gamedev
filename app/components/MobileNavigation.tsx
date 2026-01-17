"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { create } from "zustand";

import { Header } from "@/components/Header";
import { MenuIcon, XIcon } from "@/components/Icons";
import { Navigation } from "@/components/Navigation";
import { Retrobutton } from "@/components/RetroBtn";

const IsInsideMobileNavigationContext = createContext(false);

export function useIsInsideMobileNavigation() {
  return useContext(IsInsideMobileNavigationContext);
}

type MobileNavigationStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const useMobileNavigationStore = create<MobileNavigationStore>(
  (set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  })
);

export function MobileNavigation() {
  const isInsideMobileNavigation = useIsInsideMobileNavigation();
  const { isOpen, toggle, close } = useMobileNavigationStore();
  const ToggleIcon = isOpen ? XIcon : MenuIcon;
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Force reflow to ensure transition works
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Animation starts after this frame
        });
      });
    } else {
      // Wait for exit animation to complete (500ms for slide animation)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setShouldRender(false);
      }, 500);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        panelRef.current &&
        event.target === overlayRef.current
      ) {
        close();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <IsInsideMobileNavigationContext.Provider value={true}>
      <Retrobutton
        aria-label="Toggle navigation"
        className="flex h-auto w-auto items-center justify-center rounded-md transition hover:bg-gameboy-900"
        onClick={toggle}
        type="button"
      >
        <ToggleIcon className="w-6 stroke-2 stroke-gameboy-900" />
      </Retrobutton>
      {!isInsideMobileNavigation && shouldRender && (
        <div
          aria-hidden={!isOpen}
          aria-label="Mobile navigation"
          aria-modal="true"
          className={`fixed inset-0 z-50 transition-opacity duration-300 ease-out lg:hidden ${
            isOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          role="dialog"
        >
          <div
            aria-hidden="true"
            className={`fixed inset-0 bg-gameboy-900/50 transition-opacity duration-300 ease-out ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            ref={overlayRef}
          />
          <div aria-hidden="true" className="pointer-events-none fixed inset-0">
            <div
              className={`pixel-bg pointer-events-auto fixed top-0 bottom-0 left-0 w-full overflow-y-auto bg-gameboy-100 px-4 pt-24 pb-4 shadow-gameboy-900 shadow-lg ring-1 ring-zinc-900/7.5 transition-transform duration-500 ease-in-out sm:px-6 sm:pb-10 min-[416px]:max-w-sm ${isOpen ? "translate-x-0" : "-translate-x-full"}
              `}
              ref={panelRef}
            >
              <div
                className={`transition-opacity duration-300 ease-out ${
                  isOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                <Header />
              </div>
              <Navigation onClick={close} />
            </div>
          </div>
        </div>
      )}
    </IsInsideMobileNavigationContext.Provider>
  );
}
