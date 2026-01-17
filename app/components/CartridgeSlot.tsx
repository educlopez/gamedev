"use client";

import gsap from "gsap";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

type CartridgeSlotProps = {
  game: {
    id: number;
    title: string;
    url: string;
    logo: string | StaticImageData;
  };
  index: number;
};

export function CartridgeSlot({ game, index }: CartridgeSlotProps) {
  const slotRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!(slotRef.current && imageRef.current && labelRef.current)) return;

    const slot = slotRef.current;
    const image = imageRef.current;
    const label = labelRef.current;

    const handleMouseEnter = () => {
      gsap.to(slot, {
        scale: 1.1,
        zIndex: 10,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(image, {
        y: -4,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(label, {
        backgroundColor: "var(--color-gameboy-700)",
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(slot, {
        boxShadow:
          "0 0 0 4px var(--color-gameboy-400), 0 8px 16px rgba(0,0,0,0.3)",
        borderColor: "var(--color-gameboy-700)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(slot, {
        scale: 1,
        zIndex: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(image, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(label, {
        backgroundColor: "var(--color-gameboy-900)",
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(slot, {
        boxShadow: "none",
        borderColor: "var(--color-gameboy-900)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    slot.addEventListener("mouseenter", handleMouseEnter);
    slot.addEventListener("mouseleave", handleMouseLeave);

    const animationDelay = index * 0.1;
    gsap.from(slot, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: animationDelay,
      ease: "power2.out",
    });

    return () => {
      slot.removeEventListener("mouseenter", handleMouseEnter);
      slot.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [index]);

  return (
    <Link className="group relative flex flex-col items-center" href={game.url}>
      <div className="relative w-full" ref={slotRef}>
        <div
          className="cartridge-slot relative overflow-hidden p-2"
          ref={imageRef}
        >
          <div className="absolute inset-0 bg-gameboy-100 opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
          <Image
            alt={game.title}
            className="relative h-auto w-full"
            priority
            src={game.logo}
            width={193}
          />
        </div>
        <div
          className="cartridge-label mt-2 flex min-h-[3rem] items-center justify-center px-2 py-1 text-center font-bold text-xs leading-tight"
          ref={labelRef}
        >
          {game.title}
        </div>
      </div>
    </Link>
  );
}
