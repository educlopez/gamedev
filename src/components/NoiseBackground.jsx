import { useEffect, useRef } from 'react';

export default function NoiseBackground() {
  const canvasRef = useRef(null);
  let wWidth, wHeight;
  const noiseData = [];
  let frame = 0;
  let loopTimeout;
  let resizeThrottle;

  const createNoise = (ctx) => {
    const idata = ctx.createImageData(wWidth, wHeight);
    const buffer32 = new Uint32Array(idata.data.buffer);
    let len = buffer32.length;

    while (len--) {
      buffer32[len] = ((Math.random() * 30) | 0) << 24;
    }

    noiseData.push(idata);
  };

  const paintNoise = (ctx) => {
    if (frame === 9) {
      frame = 0;
    } else {
      frame++;
    }

    ctx.putImageData(noiseData[frame], 0, 0);
  };

  const loop = (ctx) => {
    paintNoise(ctx);

    loopTimeout = window.setTimeout(() => {
      window.requestAnimationFrame(() => loop(ctx));
    }, 1000 / 25);
  };

  const setup = (ctx) => {
    wWidth = window.innerWidth;
    wHeight = window.innerHeight + 100;

    canvasRef.current.width = wWidth;
    canvasRef.current.height = wHeight;

    noiseData.length = 0;

    for (let i = 0; i < 10; i++) {
      createNoise(ctx);
    }

    loop(ctx);
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) {
      throw new Error('2D context not supported or canvas not found');
    }

    setup(ctx);

    const resizeHandler = () => {
      window.clearTimeout(resizeThrottle);

      resizeThrottle = window.setTimeout(() => {
        window.clearTimeout(loopTimeout);
        setup(ctx);
      }, 200);
    };

    window.addEventListener('resize', resizeHandler);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <canvas ref={canvasRef} id="noise" aria-label="Efecto de ruido de fondo" className="fixed top-0 z-1 animate-fade-in"></canvas>
  );
}