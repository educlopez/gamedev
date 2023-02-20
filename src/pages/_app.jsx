import { useEffect, useRef } from 'react'
import tileBgDark from '@/images/bg-texture-dark.png'
import tileBgLight from '@/images/bg-texture-light.png'

import { Layout } from '@/components/Layout'
import '@/styles/tailwind.css'
import 'focus-visible'
import { Silkscreen } from '@next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { motion } from 'framer-motion'

const silkscreen = Silkscreen({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--display-gameboy',
})

function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default function App({ Component, pageProps, router }) {
  let previousPathname = usePrevious(router.pathname)

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${silkscreen.style.fontFamily};
        }
      `}</style>
      <motion.div
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <div className="relative">
          <main className={`${silkscreen.variable}`}>
            <div
              className="fixed top-0 left-0 w-full h-full dark:hidden"
              style={{
                backgroundImage: `url(${tileBgLight.src})`,
              }}
            ></div>
            <div
              className="fixed top-0 left-0 hidden w-full h-full dark:block"
              style={{
                backgroundImage: `url(${tileBgDark.src})`,
              }}
            ></div>
            <Layout {...pageProps}>
              <Component previousPathname={previousPathname} {...pageProps} />
              <Analytics />
            </Layout>
          </main>
        </div>
      </motion.div>
    </>
  )
}
