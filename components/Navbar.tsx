"use client"

import Link from "next/link"
import { ShoppingBag, Menu, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"

export default function Navbar() {
  const { totalItems } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="text-[15px] lg:text-base font-medium tracking-[0.2em] text-neutral-900 hover:opacity-60 transition-opacity duration-300"
          >
            MODA URBANA
          </Link>

          {/* Links centro (Desktop) */}
          <div className="hidden md:flex items-center gap-10">
            <Link 
              href="/" 
              className="text-[13px] tracking-wide text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
            >
              Inicio
            </Link>
            <Link 
              href="/productos" 
              className="text-[13px] tracking-wide text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
            >
              Productos
            </Link>
          </div>

          {/* Derecha: Iniciar sesión + Carrito */}
          <div className="flex items-center gap-5">
            <Link 
              href="/login" 
              className="hidden md:inline-flex text-[13px] tracking-wide px-4 py-2 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors duration-300"
            >
              Iniciar sesión
            </Link>

            <Link 
              href="/carrito" 
              className="relative group"
            >
              <ShoppingBag 
                size={20} 
                strokeWidth={1.5} 
                className="text-neutral-700 group-hover:text-neutral-900 transition-colors duration-300" 
              />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-[10px] min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center font-medium leading-none">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Botón menú móvil */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-1 text-neutral-700 hover:text-neutral-900 transition"
              aria-label="Menú"
            >
              {isOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white">
          <div className="px-4 py-6 space-y-5">
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="block text-sm tracking-wide text-neutral-600 hover:text-neutral-900 transition"
            >
              Inicio
            </Link>
            <Link 
              href="/productos" 
              onClick={() => setIsOpen(false)}
              className="block text-sm tracking-wide text-neutral-600 hover:text-neutral-900 transition"
            >
              Productos
            </Link>
            <Link 
              href="/login" 
              onClick={() => setIsOpen(false)}
              className="block text-sm tracking-wide font-medium text-neutral-900"
            >
              Iniciar sesión
            </Link>
            <Link 
              href="/carrito" 
              onClick={() => setIsOpen(false)}
              className="block text-sm tracking-wide text-neutral-600 hover:text-neutral-900 transition"
            >
              Carrito {totalItems > 0 && `(${totalItems})`}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}