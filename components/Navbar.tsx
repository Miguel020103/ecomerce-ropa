"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export default function Navbar() {
  const { totalItems } = useCart()

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl font-semibold tracking-wide text-gray-900 hover:opacity-70 transition"
          >
            MODA URBANA
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-10">
            <Link 
              href="/" 
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
            >
              Inicio
            </Link>
            <Link 
              href="/productos" 
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
            >
              Productos
            </Link>
          </div>

          {/* Carrito */}
          <Link 
            href="/carrito" 
            className="relative p-2 text-gray-700 hover:text-gray-900 transition"
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-gray-900 text-white text-[11px] w-5 h-5 rounded-full flex items-center justify-center font-medium">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}