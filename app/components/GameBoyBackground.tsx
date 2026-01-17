"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import { useLoadingStore } from "@/components/useLoadingStore";

export function GameBoyBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const setGameBoyBackgroundReady = useLoadingStore(
    (state) => state.setGameBoyBackgroundReady
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdf_f7_ce);
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      1,
      1000
    );
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.zIndex = "0";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const pixelSize = 4;
    const gridWidth = Math.ceil(width / pixelSize);
    const gridHeight = Math.ceil(height / pixelSize);

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(gridWidth * gridHeight * 3);
    const colors = new Float32Array(gridWidth * gridHeight * 3);

    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        const index = (y * gridWidth + x) * 3;
        positions[index] = (x - gridWidth / 2) * pixelSize;
        positions[index + 1] = (gridHeight / 2 - y) * pixelSize;
        positions[index + 2] = 0;

        const color = new THREE.Color(0xac_c9_97);
        colors[index] = color.r;
        colors[index + 1] = color.g;
        colors[index + 2] = color.b;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: pixelSize,
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const animate = () => {
      const time = Date.now() * 0.001;

      points.rotation.z = Math.sin(time * 0.5) * 0.01;

      const colorAttribute = geometry.attributes.color as THREE.BufferAttribute;
      for (let i = 0; i < colorAttribute.count; i++) {
        const offset = i * 3;
        const noise = Math.sin(time + i * 0.1) * 0.1 + 0.9;
        colorAttribute.array[offset] = 0.675 * noise;
        colorAttribute.array[offset + 1] = 0.788 * noise;
        colorAttribute.array[offset + 2] = 0.592 * noise;
      }
      colorAttribute.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Signal that GameBoy background is ready
    setGameBoyBackgroundReady(true);

    const handleResize = () => {
      if (!(containerRef.current && rendererRef.current)) return;

      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      camera.left = -newWidth / 2;
      camera.right = newWidth / 2;
      camera.top = newHeight / 2;
      camera.bottom = -newHeight / 2;
      camera.updateProjectionMatrix();

      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current?.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [setGameBoyBackgroundReady]);

  return (
    <div
      className="fixed inset-0 -z-10"
      ref={containerRef}
      style={{ background: "var(--color-gameboy-100)" }}
    />
  );
}
