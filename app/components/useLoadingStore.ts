import { create } from "zustand";

type LoadingStore = {
  isLoaded: boolean;
  gameBoyBackgroundReady: boolean;
  noiseBackgroundReady: boolean;
  setGameBoyBackgroundReady: (ready: boolean) => void;
  setNoiseBackgroundReady: (ready: boolean) => void;
  setLoaded: (loaded: boolean) => void;
};

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoaded: false,
  gameBoyBackgroundReady: false,
  noiseBackgroundReady: false,
  setGameBoyBackgroundReady: (ready: boolean) =>
    set((state) => {
      const newState = { ...state, gameBoyBackgroundReady: ready };
      if (newState.gameBoyBackgroundReady && newState.noiseBackgroundReady) {
        newState.isLoaded = true;
      }
      return newState;
    }),
  setNoiseBackgroundReady: (ready: boolean) =>
    set((state) => {
      const newState = { ...state, noiseBackgroundReady: ready };
      if (newState.gameBoyBackgroundReady && newState.noiseBackgroundReady) {
        newState.isLoaded = true;
      }
      return newState;
    }),
  setLoaded: (loaded: boolean) => set({ isLoaded: loaded }),
}));
