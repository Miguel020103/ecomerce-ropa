"use client"

import { useState, useMemo, useEffect } from "react"
import { getProducts, categories, Product } from "@/lib/products"
import ProductCard from "@/components/ProductCard"

type SortOption = "default" | "price-asc" | "price-desc" | "name"

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [sortBy, setSortBy] = useState<SortOption>("default")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setProducts(getProducts())
    setLoaded(true)
  }, [])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filtrar por categoría
    if (selectedCategory !== "Todos") {
      result = result.filter(
        (product) => product.category === selectedCategory
      )
    }

    // Ordenar
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [products, selectedCategory, sortBy])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Encabezado */}
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">
          Colección
        </p>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
          Todos los productos
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Piezas seleccionadas por su calidad, corte y versatilidad.
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        
        {/* Categorías */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm border transition ${
                selectedCategory === category
                  ? "bg-black text-white border-black"
                  : "border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Ordenar */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-black bg-white"
        >
          <option value="default">Ordenar por</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="name">Nombre A-Z</option>
        </select>
      </div>

      {/* Resultados */}
      {!loaded ? (
        <p className="text-center text-gray-500 py-20">Cargando productos...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 py-20">
          No hay productos en esta categoría.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}