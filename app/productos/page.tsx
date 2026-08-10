import { products } from "@/lib/products"
import ProductCard from "@/components/ProductCard"

export default function ProductosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Encabezado */}
      <div className="mb-14 text-center max-w-2xl mx-auto">
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

      {/* Grid de productos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}