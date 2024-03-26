import { useEffect, useRef } from 'react'

import { Layout } from '@/components/Layout'
import '@/styles/tailwind.css'
import 'focus-visible'
import { Silkscreen } from '@next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { motion } from 'framer-motion'
import NoiseBackground from '@/components/NoiseBackground'

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
            <div className="fixed top-0 left-0 z-50 w-full h-screen pointer-events-none crt"></div>
            <NoiseBackground />
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
