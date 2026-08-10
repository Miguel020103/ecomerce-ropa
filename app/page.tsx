import Link from "next/link"
import { products } from "@/lib/products"
import ProductCard from "@/components/ProductCard"

export default function Home() {
  const featuredProducts = products.slice(0, 4)

  return (
    <div>
      {/* Hero principal */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1800&h=1200&fit=crop"
            alt="Moda Urbana"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl">
            <p className="text-white/80 text-xs tracking-[0.25em] uppercase mb-4">
              Nueva Temporada
            </p>
            <h1 className="text-4xl md:text-6xl font-medium text-white tracking-tight leading-tight mb-6">
              Elegancia<br />en lo esencial
            </h1>
            <p className="text-white/90 text-base md:text-lg mb-10 max-w-md leading-relaxed">
              Piezas atemporales diseñadas para acompañarte en cada momento.
            </p>
            <Link
              href="/productos"
              className="inline-block bg-white text-black px-10 py-4 text-sm tracking-wide hover:bg-gray-100 transition"
            >
              Explorar colección
            </Link>
          </div>
        </div>
      </section>

      {/* Texto de marca */}
      <section className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-6">
          Nuestra filosofía
        </p>
        <h2 className="text-2xl md:text-3xl font-medium leading-relaxed text-gray-900">
          Creemos en una moda sobria, de calidad y sin exceso.  
          Prendas pensadas para durar y combinarse con facilidad.
        </h2>
      </section>

      {/* Productos destacados */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-2">
              Selección
            </p>
            <h2 className="text-2xl font-medium">Piezas destacadas</h2>
          </div>
          <Link 
            href="/productos" 
            className="text-sm text-gray-600 hover:text-black underline underline-offset-4"
          >
            Ver todo
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Banner secundario */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=900&fit=crop"
            alt="Colección"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">
            Descubre toda la colección
          </h2>
          <Link
            href="/productos"
            className="inline-block border border-white text-white px-10 py-3.5 text-sm tracking-wide hover:bg-white hover:text-black transition"
          >
            Ver productos
          </Link>
        </div>
      </section>
    </div>
  )
}