"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/Logo";
import { useLoadingStore } from "@/components/useLoadingStore";

export function LoadingScreen() {
  const logoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [hasReachedCenter, setHasReachedCenter] = useState(false);
  const isLoaded = useLoadingStore((state) => state.isLoaded);
  const checkIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Set up the animation
  useEffect(() => {
    if (!(logoRef.current && containerRef.current)) return;

    const logo = logoRef.current;
    const initialY = -window.innerHeight - 200;

    // Set initial position completely outside view at the top immediately
    gsap.set(logo, {
      y: initialY,
      opacity: 0,
      immediateRender: true,
    });

    // Make visible once positioned
    gsap.set(logo, {
      visibility: "visible",
      immediateRender: true,
    });

    // Animate logo from top to center
    const tl = gsap.timeline({
      onComplete: () => {
        setHasReachedCenter(true);
      },
    });

    // Fade in and move to center
    tl.to(logo, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    })
      // Hold at center
      .to(logo, {
        duration: 0.5,
      });

    return () => {
      tl.kill();
    };
  }, []);

  // Check for loading completion once logo reaches center
  useEffect(() => {
    if (!(hasReachedCenter && containerRef.current)) return;

    const container = containerRef.current;
    const startTime = Date.now();
    const minDisplayTime = 1000; // Minimum 1.5 seconds total display time (animation + hold)
    const maxDisplayTime = 1200; // Maximum 2.5 seconds - fallback timeout

    const fadeOut = () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Fade out and hide
      gsap.to(container, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          setIsVisible(false);
        },
      });
    };

    const checkLoaded = () => {
      const elapsed = Date.now() - startTime;
      const hasMinTimePassed = elapsed >= minDisplayTime;

      // Get fresh state from store
      const storeState = useLoadingStore.getState();

      if (storeState.isLoaded && hasMinTimePassed) {
        fadeOut();
      }
    };

    // Fallback timeout - always fade out after max time
    timeoutRef.current = setTimeout(() => {
      fadeOut();
    }, maxDisplayTime);

    // Check periodically
    checkIntervalRef.current = setInterval(checkLoaded, 100);

    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [hasReachedCenter, isLoaded]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-gameboy-100"
      ref={containerRef}
    >
      <div
        className="w-48 sm:w-64"
        ref={logoRef}
        style={{
          opacity: 0,
          visibility: "hidden",
        }}
      >
        <Logo className="h-full w-full" />
      </div>
    </div>
  );
}
