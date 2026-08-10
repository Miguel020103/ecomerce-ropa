"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { Check, CreditCard, Lock, X } from "lucide-react"

export default function CheckoutPage() {
  const { cart, totalPrice, totalItems, clearCart } = useCart()
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentStep, setPaymentStep] = useState<"form" | "processing" | "success">("form")
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  })

  // Lógica de envío
  const FREE_SHIPPING_FROM = 150000
  const SHIPPING_COST = 12000
  const shipping = totalPrice >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST
  const total = totalPrice + shipping
  const remainingForFreeShipping = FREE_SHIPPING_FROM - totalPrice

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.phone || !form.address || !form.city) {
      alert("Por favor completa todos los campos")
      return
    }

    setShowPaymentModal(true)
    setPaymentStep("form")
  }

  const handleConfirmPayment = () => {
    setPaymentStep("processing")
    setLoading(true)

    // Simulación de procesamiento de pago (2.5 segundos)
    setTimeout(() => {
      setPaymentStep("success")
      setLoading(false)

      // Después de mostrar éxito, cierra el modal y muestra la página de confirmación
      setTimeout(() => {
        setShowPaymentModal(false)
        setOrderCompleted(true)
        clearCart()
      }, 1800)
    }, 2500)
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
          <h1 className="text-2xl font-bold mb-3">¡Pago exitoso!</h1>
          <p className="text-gray-600 mb-2">
            Gracias por tu compra, <span className="font-medium">{form.name}</span>.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Hemos recibido tu pedido correctamente. Te contactaremos pronto para coordinar el envío.
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
    <>
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
                required
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
                required
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
                required
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
                required
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
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 font-medium hover:bg-gray-800 transition mt-4 flex items-center justify-center gap-2"
            >
              <Lock size={16} />
              Pagar {formatPrice(total)} con Wompi
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              Pago seguro procesado por Wompi
            </p>
          </form>

          {/* Resumen */}
          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h2 className="text-lg font-bold mb-4">
              Resumen ({totalItems} {totalItems === 1 ? "producto" : "productos"})
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

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Envío</span>
                {shipping === 0 ? (
                  <span className="text-green-600 font-medium">Gratis</span>
                ) : (
                  <span>{formatPrice(shipping)}</span>
                )}
              </div>

              {shipping > 0 && (
                <p className="text-xs text-gray-500 pt-1">
                  Te faltan {formatPrice(remainingForFreeShipping)} para envío gratis
                </p>
              )}

              <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== MODAL DE PAGO WOMPI (SIMULADO) ========== */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !loading && paymentStep === "form" && setShowPaymentModal(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* Header del modal */}
            <div className="bg-[#1a1a2e] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <CreditCard size={18} />
                </div>
                <div>
                  <p className="font-semibold text-sm">Wompi</p>
                  <p className="text-xs text-white/60">Pago seguro</p>
                </div>
              </div>
              {paymentStep === "form" && (
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="text-white/60 hover:text-white transition"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Contenido del modal */}
            <div className="p-6">
              
              {/* Paso 1: Confirmar pago */}
              {paymentStep === "form" && (
                <div className="space-y-5">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">Total a pagar</p>
                    <p className="text-3xl font-bold text-gray-900">{formatPrice(total)}</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Comercio</span>
                      <span className="font-medium">Moda Urbana</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Referencia</span>
                      <span className="font-mono text-xs">MODA-{Date.now().toString().slice(-8)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Método</span>
                      <span>Tarjeta / PSE / Nequi</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Métodos de pago disponibles</p>
                    <div className="grid grid-cols-3 gap-2">
                      {["Tarjeta", "PSE", "Nequi"].map((method) => (
                        <div 
                          key={method}
                          className="border border-gray-200 rounded-lg py-3 text-center text-sm font-medium text-gray-700 hover:border-gray-900 cursor-pointer transition"
                        >
                          {method}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmPayment}
                    className="w-full bg-[#00d4aa] hover:bg-[#00c49a] text-gray-900 font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                  >
                    <Lock size={16} />
                    Pagar {formatPrice(total)}
                  </button>

                  <p className="text-[11px] text-center text-gray-400 flex items-center justify-center gap-1">
                    <Lock size={11} />
                    Transacción protegida por Wompi
                  </p>
                </div>
              )}

              {/* Paso 2: Procesando */}
              {paymentStep === "processing" && (
                <div className="py-10 text-center space-y-5">
                  <div className="w-14 h-14 border-4 border-gray-200 border-t-[#00d4aa] rounded-full animate-spin mx-auto" />
                  <div>
                    <p className="font-medium text-gray-900">Procesando pago...</p>
                    <p className="text-sm text-gray-500 mt-1">No cierres esta ventana</p>
                  </div>
                </div>
              )}

              {/* Paso 3: Éxito */}
              {paymentStep === "success" && (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <Check size={32} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-900">¡Pago aprobado!</p>
                    <p className="text-sm text-gray-500 mt-1">Tu transacción fue exitosa</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}