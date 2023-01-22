import { motion } from 'framer-motion';
import Image from 'next/image';
import bgRayLight from '@/images/bg-ray-light.png';
import bgRayDark from '@/images/bg-ray-dark.png';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export function Layout({ children = [] }) {
  return (
    <>
      <div className="relative overflow-hidden">
        <Image
          src={bgRayLight}
          alt="Background ray for light mode"
          className="absolute top-0 left-1/2 -ml-[39rem] w-[113.125rem] max-w-none dark:hidden"
          priority
        />
        <Image
          src={bgRayDark}
          alt="Background ray for dark mode"
          className="absolute hidden top-0 left-1/2 -ml-[39rem] w-[113.125rem] max-w-none dark:block"
          priority
        />
        <motion.header layoutScroll>
          <Header />
        </motion.header>
        <div className="relative max-w-2xl px-4 pb-16 mx-auto space-y-10 pt-14 sm:px-6 lg:px-8 lg:max-w-5xl">
          <main className="py-16">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}
