import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ShoppingCart from "@/components/shopping-cart"

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Anime Threads - Premium Anime Clothing",
  description: "Discover premium anime-inspired clothing and accessories",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.className} bg-[#0a0a0a] text-white min-h-screen`}>
        <div className="relative flex size-full min-h-screen flex-col bg-[#0a0a0a] overflow-x-hidden">
          <div className="layout-container flex h-full grow flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ShoppingCart />
        </div>
      </body>
    </html>
  )
}
