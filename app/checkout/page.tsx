"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"

export default function CheckoutPage() {
  const { cart, totalPrice, totalItems, clearCart } = useCart()
  const [orderCompleted, setOrderCompleted] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.phone || !form.address || !form.city) {
      alert("Por favor completa todos los campos")
      return
    }

    // Aquí en un proyecto real se enviaría a Wompi o a un backend
    setOrderCompleted(true)
    clearCart()
  }

  if (cart.length === 0 && !orderCompleted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">No hay productos en el carrito</h1>
        <Link href="/productos" className="underline">
          Volver a productos
        </Link>
      </div>
    )
  }

  if (orderCompleted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
            ✓
          </div>
          <h1 className="text-2xl font-bold mb-3">¡Pedido recibido!</h1>
          <p className="text-gray-600 mb-8">
            Gracias por tu compra. Te contactaremos pronto para confirmar el pedido y coordinar el envío.
          </p>
          <Link
            href="/productos"
            className="inline-block bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre completo</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-black"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-black"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Teléfono / WhatsApp</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-black"
              placeholder="300 000 0000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Dirección de entrega</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-black"
              placeholder="Calle, número, barrio"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ciudad</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-black"
              placeholder="Bogotá"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 font-medium hover:bg-gray-800 transition mt-4"
          >
            Confirmar Pedido
          </button>
        </form>

        {/* Resumen */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-lg font-bold mb-4">
            Resumen ({totalItems} productos)
          </h2>

          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                className="flex justify-between text-sm"
              >
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-gray-500">
                    {item.size} / {item.color} × {item.quantity}
                  </p>
                </div>
                <p>{formatPrice(item.product.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Envío gratis a toda Colombia
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}