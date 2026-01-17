"use client";

import gsap from "gsap";
import { useEffect, useState } from "react";

export function GameBoyIntro() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("gameboy-intro-seen");

    if (hasSeenIntro) {
      setIsVisible(false);
      return;
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("gameboy-intro-seen", "true");
        gsap.to(".intro-container", {
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            setIsVisible(false);
          },
        });
      },
    });

    // Initial screen flash
    timeline
      .from(".intro-screen", {
        opacity: 0,
        duration: 0.1,
      })
      .to(".intro-screen", {
        opacity: 1,
        duration: 0.1,
      });

    // Stage 1: Nintendo logo with pixelated effect
    timeline
      .set(".nintendo-logo", {
        opacity: 0,
        scale: 0.5,
        filter: "blur(10px)",
      })
      .to(".nintendo-logo", {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out",
      })
      .to(".nintendo-logo", {
        opacity: 0,
        scale: 0.8,
        filter: "blur(5px)",
        duration: 0.5,
        delay: 1.2,
        ease: "power2.in",
      });

    // Stage 2: Game Boy logo
    timeline
      .set(".gameboy-logo", {
        opacity: 0,
        scale: 0.5,
        y: 20,
      })
      .to(".gameboy-logo", {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.2)",
      })
      .to(".gameboy-logo", {
        opacity: 0,
        scale: 0.8,
        y: -10,
        duration: 0.5,
        delay: 1.2,
        ease: "power2.in",
      });

    // Stage 3: Loading animation
    timeline
      .set(".loading-container", {
        opacity: 0,
        y: 10,
      })
      .to(".loading-container", {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });

    // Animate loading dots
    const dotsAnimation = gsap.to(".loading-dot", {
      opacity: 0.2,
      scale: 0.8,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
      ease: "power2.inOut",
    });

    // Complete after loading
    timeline.to(
      {},
      {
        duration: 1.8,
        onComplete: () => {
          dotsAnimation.kill();
        },
      }
    );

    return () => {
      timeline.kill();
      dotsAnimation.kill();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="intro-container fixed inset-0 z-[9999] flex items-center justify-center bg-gameboy-100">
      <div className="intro-screen relative flex h-full w-full items-center justify-center">
        {/* Nintendo Logo */}
        <div className="nintendo-logo absolute">
          <div className="font-bold text-5xl text-gameboy-900 tracking-[0.3em]">
            NINTENDO
          </div>
          <div className="mt-2 text-center text-gameboy-700 text-xs">TM</div>
        </div>

        {/* Game Boy Logo */}
        <div className="gameboy-logo absolute">
          <div className="flex flex-col items-center gap-3">
            <div className="font-bold text-6xl text-gameboy-900 tracking-wider">
              GAME BOY
            </div>
            <div className="h-1.5 w-40 bg-gameboy-900" />
            <div className="mt-1 text-gameboy-700 text-xs">COLOR</div>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="loading-container absolute flex flex-col items-center gap-4">
          <div className="flex gap-3">
            <div className="loading-dot h-4 w-4 rounded-full bg-gameboy-900" />
            <div className="loading-dot h-4 w-4 rounded-full bg-gameboy-900" />
            <div className="loading-dot h-4 w-4 rounded-full bg-gameboy-900" />
          </div>
          <div className="text-gameboy-700 text-xs">LOADING...</div>
        </div>
      </div>
    </div>
  );
}
