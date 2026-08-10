import Link from "next/link"
import { Product } from "@/lib/products"
import { formatPrice } from "@/lib/utils"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/productos/${product.id}`} className="group block">
      <div className="aspect-[3/4] overflow-hidden bg-gray-50 rounded-xl mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>
      <div className="space-y-1">
        <h3 className="font-medium text-gray-900 group-hover:underline underline-offset-4">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  )
}