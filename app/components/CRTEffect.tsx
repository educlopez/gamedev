"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";

export function CRTEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const scanlineAnimationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!(containerRef.current && scanlineRef.current)) {
      return;
    }

    const container = containerRef.current;
    const scanlineCanvas = scanlineRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Setup scanline canvas
    scanlineCanvas.width = width;
    scanlineCanvas.height = height;
    const scanlineCtx = scanlineCanvas.getContext("2d");
    if (!scanlineCtx) {
      return;
    }

    // Create Three.js scene for screen distortion and effects
    const scene = new Scene();
    sceneRef.current = scene;

    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.mixBlendMode = "overlay";
    renderer.domElement.style.opacity = "0.4";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create shader material for screen distortion/curvature
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;
      uniform vec2 resolution;
      varying vec2 vUv;
      
      void main() {
        vec2 uv = vUv;
        
        // Screen curvature effect
        vec2 center = vec2(0.5, 0.5);
        vec2 coord = uv - center;
        float dist = length(coord);
        float curvature = 0.1;
        float distortion = dist * dist * curvature;
        uv = center + coord * (1.0 + distortion);
        
        // Vignette effect
        float vignette = 1.0 - smoothstep(0.3, 1.0, dist * 1.5);
        
        // Color bleeding (green phosphor glow) - more visible
        float greenGlow = sin(time * 0.5) * 0.05 + 0.95;
        vec3 color = vec3(0.0, greenGlow * 0.25, 0.0) * vignette;
        
        // Scanline interference pattern - more visible
        float scanline = sin(uv.y * resolution.y * 0.5 + time * 2.0) * 0.05 + 0.95;
        color += vec3(scanline * 0.15);
        
        // Add more pronounced vignette
        gl_FragColor = vec4(color, vignette * 0.3);
      }
    `;

    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new Vector2(width, height) },
      },
      transparent: true,
    });

    const geometry = new PlaneGeometry(2, 2);
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    // Animate scanlines with GSAP
    const scanlineAnimation = () => {
      if (!scanlineCtx) {
        return;
      }

      scanlineCtx.clearRect(0, 0, width, height);

      const time = Date.now() * 0.001;
      const scanlineHeight = 3;
      const spacing = 4;
      const offset = (time * 100) % spacing;

      // Draw scanlines - more visible
      scanlineCtx.fillStyle = "rgba(0, 0, 0, 0.15)";
      for (let y = -spacing + offset; y < height; y += spacing) {
        scanlineCtx.fillRect(0, y, width, scanlineHeight);
      }

      // Add horizontal interference lines - more visible
      scanlineCtx.strokeStyle = "rgba(134, 192, 108, 0.08)";
      scanlineCtx.lineWidth = 1;
      for (let y = 0; y < height; y += spacing * 2) {
        scanlineCtx.beginPath();
        scanlineCtx.moveTo(0, y + offset);
        scanlineCtx.lineTo(width, y + offset);
        scanlineCtx.stroke();
      }

      scanlineAnimationRef.current = requestAnimationFrame(scanlineAnimation);
    };

    // Three.js render loop
    const animate = () => {
      if (material.uniforms.time) {
        material.uniforms.time.value = Date.now() * 0.001;
      }
      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    scanlineAnimation();

    // GSAP subtle pulse for screen glow
    const glowTimeline = gsap.timeline({ repeat: -1 });
    glowTimeline.to(containerRef.current, {
      opacity: 1.02,
      duration: 3,
      ease: "sine.inOut",
    });
    glowTimeline.to(containerRef.current, {
      opacity: 0.98,
      duration: 3,
      ease: "sine.inOut",
    });

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      if (scanlineCanvas) {
        scanlineCanvas.width = newWidth;
        scanlineCanvas.height = newHeight;
      }

      if (material.uniforms.resolution) {
        material.uniforms.resolution.value.set(newWidth, newHeight);
      }

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (scanlineAnimationRef.current) {
        cancelAnimationFrame(scanlineAnimationRef.current);
      }
      glowTimeline.kill();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, []);

  return (
    <div
      className="mix-blend-mode-overlay pointer-events-none fixed inset-0 z-[60]"
      ref={containerRef}
      style={{
        opacity: 1,
        background: `
          radial-gradient(ellipse at center, transparent 0%, transparent 70%, rgba(7, 24, 33, 0.08) 100%),
          radial-gradient(ellipse 80% 50% at 50% 0%, rgba(134, 192, 108, 0.12) 0%, transparent 50%),
          radial-gradient(ellipse 80% 50% at 50% 100%, rgba(135, 201, 151, 0.08) 0%, transparent 50%)
        `,
      }}
    >
      <canvas
        className="mix-blend-mode-overlay pointer-events-none absolute inset-0 h-full w-full"
        ref={scanlineRef}
        style={{ opacity: 0.8 }}
      />
    </div>
  );
}
