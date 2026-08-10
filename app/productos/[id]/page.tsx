"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { getProductById, getRelatedProducts } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/utils"
import ProductCard from "@/components/ProductCard"
import Link from "next/link"

export default function ProductoPage() {
  const params = useParams()
  const product = getProductById(params.id as string)
  const related = getRelatedProducts(params.id as string)
  const { addToCart } = useCart()

  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-medium mb-4">Producto no encontrado</h1>
        <Link href="/productos" className="text-sm underline underline-offset-4">
          Volver a productos
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Por favor selecciona talla y color")
      return
    }
    addToCart(product, selectedSize, selectedColor)
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <div>
      {/* Producto principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Imagen */}
          <div className="aspect-[3/4] bg-gray-50 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Información */}
          <div className="flex flex-col justify-center">
            <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">
              {product.category}
            </p>
            
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
              {product.name}
            </h1>
            
            <p className="text-xl mb-8">
              {formatPrice(product.price)}
            </p>
            
            <p className="text-gray-600 leading-relaxed mb-10 max-w-md">
              {product.description}
            </p>

            {/* Tallas */}
            <div className="mb-8">
              <h3 className="text-xs tracking-[0.15em] uppercase text-gray-500 mb-4">
                Talla
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] h-11 px-3 text-sm border transition-all ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colores */}
            <div className="mb-10">
              <h3 className="text-xs tracking-[0.15em] uppercase text-gray-500 mb-4">
                Color
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-5 h-11 text-sm border transition-all ${
                      selectedColor === color
                        ? "border-black bg-black text-white"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Botón */}
            <button
              onClick={handleAddToCart}
              className="w-full h-14 bg-black text-white text-sm tracking-wide hover:bg-gray-800 transition-colors"
            >
              {added ? "Agregado al carrito" : "Agregar al carrito"}
            </button>
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      <section className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-10 text-center">
            También te puede interesar
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}