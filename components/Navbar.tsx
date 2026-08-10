"use client"

import Link from "next/link"
import { ShoppingBag, User, LogOut, Menu, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"

export default function Navbar() {
  const { totalItems } = useCart()
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl font-semibold tracking-[0.15em] text-gray-900 hover:opacity-70 transition"
          >
            MODA URBANA
          </Link>

          {/* Links desktop */}
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

          {/* Acciones derecha */}
          <div className="flex items-center gap-3 sm:gap-5">
            
            {/* Auth */}
            {session ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-medium">
                    {session.user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-700 font-medium">
                    {session.user?.name}
                  </span>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="p-2 text-gray-600 hover:text-gray-900 transition"
                  title="Cerrar sesión"
                >
                  <LogOut size={20} strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link 
                  href="/login" 
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                >
                  Iniciar sesión
                </Link>
                <Link 
                  href="/register" 
                  className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
                >
                  Registrarse
                </Link>
              </div>
            )}

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

            {/* Botón menú móvil */}
            <button 
              className="md:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link 
              href="/" 
              className="block text-sm font-medium text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              href="/productos" 
              className="block text-sm font-medium text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Productos
            </Link>

            {!session && (
              <>
                <Link 
                  href="/login" 
                  className="block text-sm font-medium text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <Link 
                  href="/register" 
                  className="block text-sm font-medium text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}