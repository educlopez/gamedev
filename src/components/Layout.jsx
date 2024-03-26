import { motion } from 'framer-motion'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export function Layout({ children = [] }) {
  return (
    <div className="relative overflow-hidden">
      <motion.header layoutScroll>
        <Header />
      </motion.header>
      <div className="relative max-w-2xl px-4 pb-16 mx-auto space-y-10 pt-14 sm:px-6 lg:px-8 lg:max-w-5xl">
        <main className="py-16">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
