import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Moda Urbana | Tienda de Ropa",
  description: "Tienda de ropa online - E-commerce prototipo",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SessionProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster 
              position="bottom-right" 
              richColors 
              closeButton 
              duration={3000}
            />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  )
}