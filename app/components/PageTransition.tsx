"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const prevPathnameRef = useRef<string>(pathname);

  useEffect(() => {
    if (prevPathnameRef.current === pathname) return;

    const container = containerRef.current;
    const overlay = overlayRef.current;

    if (!(container && overlay)) return;

    const timeline = gsap.timeline();

    // Fade out current content
    timeline.to(container, {
      opacity: 0,
      y: -10,
      duration: 0.3,
      ease: "power2.in",
    });

    // Show transition overlay (Game Boy screen flash)
    timeline
      .set(overlay, {
        display: "block",
        opacity: 0,
        backgroundColor: "var(--color-gameboy-100)",
      })
      .to(overlay, {
        opacity: 0.9,
        duration: 0.1,
        ease: "power2.out",
      })
      .to(overlay, {
        opacity: 0,
        backgroundColor: "var(--color-gameboy-900)",
        duration: 0.15,
        ease: "power2.in",
      });

    // Fade in new content
    timeline.to(container, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        gsap.set(overlay, { display: "none" });
      },
    });

    prevPathnameRef.current = pathname;

    return () => {
      timeline.kill();
    };
  }, [pathname]);

  return (
    <>
      <div ref={containerRef} style={{ opacity: 1 }}>
        {children}
      </div>
      <div
        className="fixed inset-0 z-[9998]"
        ref={overlayRef}
        style={{ display: "none" }}
      />
    </>
  );
}
