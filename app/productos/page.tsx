"use client"

import { useState, useMemo } from "react"
import { products, categories } from "@/lib/products"
import ProductCard from "@/components/ProductCard"

type SortOption = "default" | "price-asc" | "price-desc" | "name"

export default function ProductosPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [sortBy, setSortBy] = useState<SortOption>("default")

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filtro por categoría
    if (selectedCategory !== "Todos") {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // Ordenamiento
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }

    return result
  }, [selectedCategory, sortBy])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-2">
          Catálogo
        </p>
        <h1 className="text-3xl font-medium text-gray-900">Productos</h1>
      </div>

      {/* Filtros y ordenamiento */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        
        {/* Categorías */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                selectedCategory === cat
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Ordenar */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">Ordenar:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="border border-gray-300 text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-gray-900 bg-white"
          >
            <option value="default">Destacados</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="name">Nombre A-Z</option>
          </select>
        </div>
      </div>

      {/* Contador */}
      <p className="text-sm text-gray-500 mb-6">
        {filteredProducts.length} {filteredProducts.length === 1 ? "producto" : "productos"}
        {selectedCategory !== "Todos" && (
          <span> en <span className="font-medium text-gray-900">{selectedCategory}</span></span>
        )}
      </p>

      {/* Grid de productos */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-gray-500 mb-4">No hay productos en esta categoría</p>
          <button
            onClick={() => setSelectedCategory("Todos")}
            className="text-sm underline underline-offset-4 hover:text-black"
          >
            Ver todos los productos
          </button>
        </div>
      )}
    </div>
  )
}