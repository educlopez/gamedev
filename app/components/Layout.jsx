import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"

export function Layout({ children = [] }) {
  return (
    <div className="relative overflow-hidden">
      <Header />
      <div className="relative mx-auto max-w-2xl space-y-10 px-4 pb-16 pt-14 sm:px-6 lg:max-w-5xl lg:px-8">
        <main className="py-16">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
