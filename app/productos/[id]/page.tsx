"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { products } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { Check, ChevronRight, Truck, RotateCcw, Shield } from "lucide-react"
import { toast } from "sonner"

export default function ProductDetailPage() {
  const params = useParams()
  const { addToCart } = useCart()

  const product = products.find((p) => p.id === params.id)

  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [added, setAdded] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (added) {
      const timer = setTimeout(() => setAdded(false), 2500)
      return () => clearTimeout(timer)
    }
  }, [added])

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-medium text-gray-900 mb-4">Producto no encontrado</h1>
        <Link href="/productos" className="text-sm underline underline-offset-4 text-gray-600 hover:text-black">
          Volver a productos
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      setError("Por favor selecciona talla y color")
      return
    }

    setError("")
    addToCart(product, selectedSize, selectedColor)
    setAdded(true)

    // Toast de confirmación
    toast.success("Producto agregado al carrito", {
      description: `${product.name} — Talla ${selectedSize} / ${selectedColor}`,
    })
  }

  const sizes = product.sizes || ["S", "M", "L", "XL"]
  const colors = product.colors || ["Blanco", "Negro"]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-900 transition">Inicio</Link>
        <ChevronRight size={14} />
        <Link href="/productos" className="hover:text-gray-900 transition">Productos</Link>
        <ChevronRight size={14} />
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        
        {/* Imagen */}
        <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Información */}
        <div className="flex flex-col">
          <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">
            {product.category}
          </p>

          <h1 className="text-3xl md:text-4xl font-medium text-gray-900 tracking-tight mb-4">
            {product.name}
          </h1>

          <p className="text-2xl text-gray-900 mb-6">
            $ {product.price.toLocaleString("es-CO")}
          </p>

          <p className="text-gray-600 leading-relaxed mb-8 max-w-md">
            {product.description}
          </p>

          {/* Tallas */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs tracking-[0.15em] uppercase text-gray-500">Talla</p>
              {selectedSize && (
                <p className="text-sm text-gray-900">Seleccionada: <span className="font-medium">{selectedSize}</span></p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size)
                    setError("")
                  }}
                  className={`w-12 h-12 border text-sm font-medium transition ${
                    selectedSize === size
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-300 text-gray-700 hover:border-gray-900"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colores */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs tracking-[0.15em] uppercase text-gray-500">Color</p>
              {selectedColor && (
                <p className="text-sm text-gray-900">Seleccionado: <span className="font-medium">{selectedColor}</span></p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedColor(color)
                    setError("")
                  }}
                  className={`px-5 py-2.5 border text-sm font-medium transition ${
                    selectedColor === color
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-300 text-gray-700 hover:border-gray-900"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Botón agregar */}
          <button
            onClick={handleAddToCart}
            disabled={added}
            className={`w-full py-4 text-sm font-medium tracking-wide transition flex items-center justify-center gap-2 ${
              added
                ? "bg-green-600 text-white"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {added ? (
              <>
                <Check size={18} />
                Agregado al carrito
              </>
            ) : (
              "Agregar al carrito"
            )}
          </button>

          {/* Beneficios */}
          <div className="mt-10 pt-8 border-t border-gray-100 space-y-4">
            <div className="flex items-start gap-3">
              <Truck size={18} className="text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">Envío gratis</p>
                <p className="text-sm text-gray-500">En compras superiores a $150.000</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RotateCcw size={18} className="text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">Devoluciones</p>
                <p className="text-sm text-gray-500">30 días para cambios y devoluciones</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield size={18} className="text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">Compra segura</p>
                <p className="text-sm text-gray-500">Pago protegido y datos encriptados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}