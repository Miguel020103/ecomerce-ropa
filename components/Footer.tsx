"use client"

import Link from "next/link"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail("")
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <footer className="bg-neutral-950 text-white">
      {/* Sección principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Marca */}
          <div className="lg:col-span-4">
            <h3 className="text-lg font-medium tracking-wide mb-5">
              MODA URBANA
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
              Prendas atemporales diseñadas con atención al detalle, 
              materiales de calidad y un enfoque minimalista.
            </p>

            {/* Redes sociales */}
            <div className="flex gap-5 mt-8">
              <a href="#" className="text-neutral-400 hover:text-white transition text-sm">
                Instagram
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition text-sm">
                TikTok
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition text-sm">
                Pinterest
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div className="lg:col-span-2">
            <h4 className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-5">
              Tienda
            </h4>
            <ul className="space-y-3.5 text-sm text-neutral-300">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-white transition">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/carrito" className="hover:text-white transition">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Ayuda */}
          <div className="lg:col-span-2">
            <h4 className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-5">
              Ayuda
            </h4>
            <ul className="space-y-3.5 text-sm text-neutral-300">
              <li>
                <span className="hover:text-white transition cursor-pointer">
                  Envíos
                </span>
              </li>
              <li>
                <span className="hover:text-white transition cursor-pointer">
                  Devoluciones
                </span>
              </li>
              <li>
                <span className="hover:text-white transition cursor-pointer">
                  Preguntas frecuentes
                </span>
              </li>
              <li>
                <span className="hover:text-white transition cursor-pointer">
                  Contacto
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-5">
              Newsletter
            </h4>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
              Suscríbete y sé el primero en conocer nuevos lanzamientos y ofertas exclusivas.
            </p>

            {subscribed ? (
              <p className="text-sm text-emerald-400">
                ✓ Gracias por suscribirte
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  className="flex-1 bg-neutral-900 border border-neutral-800 px-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600 transition"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-black px-6 py-3.5 text-sm font-medium tracking-wide hover:bg-neutral-200 transition whitespace-nowrap"
                >
                  Suscribirme
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-500">
            © 2026 Moda Urbana. Todos los derechos reservados.
          </p>
          <p className="text-xs text-neutral-600">
            Prototipo de portafolio · Hecho con Next.js
          </p>
        </div>
      </div>
    </footer>
  )
}