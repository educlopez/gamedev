"use client";

import { useEffect, useRef } from "react";

import { useLoadingStore } from "@/components/useLoadingStore";

export default function NoiseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const setNoiseBackgroundReady = useLoadingStore(
    (state) => state.setNoiseBackgroundReady
  );
  let wWidth: number;
  let wHeight: number;
  const noiseData: ImageData[] = [];
  let frame = 0;
  let loopTimeout: number;
  let resizeThrottle: number;

  const createNoise = (ctx: CanvasRenderingContext2D) => {
    const idata = ctx.createImageData(wWidth, wHeight);
    const buffer32 = new Uint32Array(idata.data.buffer);
    let len = buffer32.length;

    while (len--) {
      buffer32[len] = ((Math.random() * 30) | 0) << 24;
    }

    noiseData.push(idata);
  };

  const paintNoise = (ctx: CanvasRenderingContext2D) => {
    if (frame === 9) {
      frame = 0;
    } else {
      frame++;
    }

    ctx.putImageData(noiseData[frame], 0, 0);
  };

  const loop = (ctx: CanvasRenderingContext2D) => {
    paintNoise(ctx);

    loopTimeout = window.setTimeout(() => {
      window.requestAnimationFrame(() => loop(ctx));
    }, 1000 / 25);
  };

  const setup = (ctx: CanvasRenderingContext2D) => {
    wWidth = window.innerWidth;
    wHeight = window.innerHeight + 100;

    if (canvasRef.current) {
      canvasRef.current.width = wWidth;
      canvasRef.current.height = wHeight;
    }

    noiseData.length = 0;

    for (let i = 0; i < 10; i++) {
      createNoise(ctx);
    }

    loop(ctx);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) {
      throw new Error("2D context not supported or canvas not found");
    }

    setup(ctx);

    // Signal that noise background is ready
    setNoiseBackgroundReady(true);

    const resizeHandler = () => {
      window.clearTimeout(resizeThrottle);

      resizeThrottle = window.setTimeout(() => {
        window.clearTimeout(loopTimeout);
        setup(ctx);
      }, 200);
    };

    window.addEventListener("resize", resizeHandler);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.clearTimeout(loopTimeout);
      window.clearTimeout(resizeThrottle);
    };
  }, [setNoiseBackgroundReady]);

  return (
    <canvas
      aria-label="Efecto de ruido de fondo"
      className="pointer-events-none fixed top-0 left-0 z-[100] animate-fade-in"
      id="noise"
      ref={canvasRef}
    />
  );
}
