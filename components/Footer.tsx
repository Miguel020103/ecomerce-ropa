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
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          
          {/* Marca */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold tracking-wide mb-4">
              MODA URBANA
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Prendas atemporales diseñadas con atención al detalle y calidad.
            </p>
          </div>

          {/* Navegación */}
          <div className="md:col-span-2">
            <h4 className="text-xs tracking-[0.15em] uppercase text-gray-400 mb-4">
              Tienda
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-black transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-black transition">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/carrito" className="hover:text-black transition">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Información */}
          <div className="md:col-span-2">
            <h4 className="text-xs tracking-[0.15em] uppercase text-gray-400 mb-4">
              Información
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>Envíos a todo el país</li>
              <li>Cambios y devoluciones</li>
              <li>Preguntas frecuentes</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-5">
            <h4 className="text-xs tracking-[0.15em] uppercase text-gray-400 mb-4">
              Newsletter
            </h4>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              Recibe novedades y lanzamientos antes que nadie.
            </p>

            {subscribed ? (
              <p className="text-sm text-green-700">
                Gracias por suscribirte.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  className="flex-1 border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                  required
                />
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-3 text-sm tracking-wide hover:bg-gray-800 transition"
                >
                  Suscribirme
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Línea inferior */}
        <div className="border-t border-gray-100 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © 2026 Moda Urbana. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-400">
            Prototipo de portafolio
          </p>
        </div>
      </div>
    </footer>
  )
}