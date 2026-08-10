"use client"

import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/utils"
import { Trash2, Minus, Plus } from "lucide-react"

export default function CarritoPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart()

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
        <p className="text-gray-600 mb-8">Agrega algunos productos para continuar</p>
        <Link
          href="/productos"
          className="inline-block bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition"
        >
          Ver Productos
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">
        Carrito ({totalItems} {totalItems === 1 ? "producto" : "productos"})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Lista de productos */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={`${item.product.id}-${item.size}-${item.color}`}
              className="flex gap-4 border-b border-gray-200 pb-6"
            >
              <div className="w-24 h-32 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Talla: {item.size} | Color: {item.color}
                    </p>
                    <p className="text-sm font-medium mt-2">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      removeFromCart(item.product.id, item.size, item.color)
                    }
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product.id,
                        item.size,
                        item.color,
                        item.quantity - 1
                      )
                    }
                    className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product.id,
                        item.size,
                        item.color,
                        item.quantity + 1
                      )
                    }
                    className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen */}
        <div className="bg-gray-50 p-6 h-fit rounded-lg">
          <h2 className="text-lg font-bold mb-4">Resumen del pedido</h2>
          
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Envío</span>
            <span className="text-green-600">Gratis</span>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mb-6">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="block w-full bg-black text-white text-center py-3 font-medium hover:bg-gray-800 transition"
          >
            Finalizar Compra
          </Link>
        </div>
      </div>
    </div>
  )
}