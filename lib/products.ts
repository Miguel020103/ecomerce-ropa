export type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  sizes: string[]
  colors: string[]
}

export const products: Product[] = [
  {
    id: "1",
    name: "Camiseta Oversize Blanca",
    description: "Camiseta de algodón peinado de alta calidad. Corte oversize relajado, ideal para un estilo minimalista y contemporáneo.",
    price: 89000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop",
    category: "Camisetas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanco", "Negro"],
  },
  {
    id: "2",
    name: "Pantalón Cargo Negro",
    description: "Pantalón cargo de silueta moderna. Confeccionado en tela resistente con bolsillos funcionales y acabado premium.",
    price: 159000,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1000&fit=crop",
    category: "Pantalones",
    sizes: ["28", "30", "32", "34"],
    colors: ["Negro", "Beige"],
  },
  {
    id: "3",
    name: "Hoodie Gris Básico",
    description: "Sudadera con capucha de interior afelpado. Diseño atemporal, perfecta para un look urbano sofisticado.",
    price: 189000,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop",
    category: "Sudaderas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gris", "Negro", "Azul Marino"],
  },
  {
    id: "4",
    name: "Chaqueta Denim Clásica",
    description: "Chaqueta de mezclilla con corte estructurado. Un básico esencial con presencia y versatilidad.",
    price: 229000,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&h=1000&fit=crop",
    category: "Chaquetas",
    sizes: ["S", "M", "L"],
    colors: ["Azul"],
  },
  {
    id: "5",
    name: "Camisa de Lino Beige",
    description: "Camisa de lino natural. Ligera, transpirable y con caída elegante. Ideal para climas cálidos.",
    price: 135000,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop",
    category: "Camisas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Blanco"],
  },
  {
    id: "6",
    name: "Blazer Negro Estructurado",
    description: "Blazer de corte sastre con solapas definidas. Aporta elegancia y estructura a cualquier look.",
    price: 279000,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop",
    category: "Blazers",
    sizes: ["S", "M", "L"],
    colors: ["Negro", "Gris"],
  },
  {
    id: "7",
    name: "Vestido Negro Minimal",
    description: "Vestido corto de silueta limpia. Diseño sobrio y sofisticado, ideal para múltiples ocasiones.",
    price: 189000,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop",
    category: "Vestidos",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Negro"],
  },
  {
    id: "8",
    name: "Pantalón Sastre Beige",
    description: "Pantalón de vestir con pinzas y caída fluida. Confeccionado para un look elegante y cómodo.",
    price: 169000,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=1000&fit=crop",
    category: "Pantalones",
    sizes: ["28", "30", "32", "34"],
    colors: ["Beige", "Negro"],
  },
  {
    id: "9",
    name: "Abrigo Largo Camel",
    description: "Abrigo largo de paño en tono camel. Diseño atemporal con presencia y calidez.",
    price: 349000,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=1000&fit=crop",
    category: "Abrigos",
    sizes: ["S", "M", "L"],
    colors: ["Camel"],
  },
  {
    id: "10",
    name: "Top de Punto Blanco",
    description: "Top de punto fino con cuello redondo. Suave al tacto y perfecto para combinar en capas.",
    price: 99000,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=1000&fit=crop",
    category: "Tops",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Blanco", "Negro", "Gris"],
  },
]

export function getProductById(id: string) {
  return products.find((product) => product.id === id)
}

export function getRelatedProducts(currentId: string, limit = 4) {
  return products.filter((p) => p.id !== currentId).slice(0, limit)
}