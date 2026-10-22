"use client"

import { useEffect, useRef } from "react"

export default function NoiseBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      throw new Error("2D context not supported or canvas not found")
    }

    const noiseData = []
    let wWidth
    let wHeight
    let frame = 0
    let loopTimeout
    let resizeThrottle

    const createNoise = () => {
      const idata = ctx.createImageData(wWidth, wHeight)
      const buffer32 = new Uint32Array(idata.data.buffer)
      let len = buffer32.length

      while (len--) {
        buffer32[len] = ((Math.random() * 30) | 0) << 24
      }

      noiseData.push(idata)
    }

    const paintNoise = () => {
      if (frame === 9) {
        frame = 0
      } else {
        frame++
      }

      ctx.putImageData(noiseData[frame], 0, 0)
    }

    const loop = () => {
      paintNoise()

      loopTimeout = window.setTimeout(() => {
        window.requestAnimationFrame(() => loop())
      }, 1000 / 25)
    }

    const setup = () => {
      wWidth = window.innerWidth
      wHeight = window.innerHeight + 100

      canvas.width = wWidth
      canvas.height = wHeight

      noiseData.length = 0

      for (let i = 0; i < 10; i++) {
        createNoise()
      }

      loop()
    }

    setup()

    const resizeHandler = () => {
      window.clearTimeout(resizeThrottle)

      resizeThrottle = window.setTimeout(() => {
        window.clearTimeout(loopTimeout)
        setup()
      }, 200)
    }

    window.addEventListener("resize", resizeHandler)

    return () => {
      window.removeEventListener("resize", resizeHandler)
      window.clearTimeout(resizeThrottle)
      window.clearTimeout(loopTimeout)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="noise"
      aria-label="Efecto de ruido de fondo"
      className="z-1 animate-fade-in fixed top-0"
    ></canvas>
  )
}
