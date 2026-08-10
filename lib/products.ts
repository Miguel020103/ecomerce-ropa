export type Product = {
  id: string
  name: string
  price: number
  description: string
  image: string
  category: string
  sizes?: string[]
  colors?: string[]
}

export const products: Product[] = [
  {
    id: "1",
    name: "Camiseta Oversize Blanca",
    price: 89000,
    description: "Camiseta de algodón peinado de alta calidad. Corte oversize relajado, ideal para un estilo minimalista y contemporáneo.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop",
    category: "Camisetas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanco", "Negro", "Gris"],
  },
  {
    id: "2",
    name: "Camiseta Oversize Negra",
    price: 89000,
    description: "Versión en negro de nuestra camiseta oversize. Algodón suave y caída perfecta.",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1000&fit=crop",
    category: "Camisetas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Blanco"],
  },
  {
    id: "3",
    name: "Hoodie Essential Gris",
    price: 189000,
    description: "Hoodie de felpa francesa con capucha y bolsillo canguro. Ideal para el día a día.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gris", "Negro", "Beige"],
  },
  {
    id: "4",
    name: "Hoodie Essential Negro",
    price: 189000,
    description: "Hoodie clásico en negro. Interior suave y ajuste relajado.",
    image: "https://images.unsplash.com/photo-1614214191247-5b2d3a734f1b?w=800&h=1000&fit=crop",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Gris"],
  },
  {
    id: "5",
    name: "Pantalón Cargo Beige",
    price: 159000,
    description: "Pantalón cargo de algodón con bolsillos laterales. Corte recto y cómodo.",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1000&fit=crop",
    category: "Pantalones",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Beige", "Negro", "Verde oliva"],
  },
  {
    id: "6",
    name: "Jean Slim Fit Azul",
    price: 149000,
    description: "Jean de denim elástico con corte slim. Ideal para un look urbano limpio.",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&fit=crop",
    category: "Pantalones",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Azul", "Negro"],
  },
  {
    id: "7",
    name: "Chaqueta Bomber Negra",
    price: 249000,
    description: "Chaqueta bomber ligera con cierre frontal y ribetes en puños y cintura.",
    image: "https://images.unsplash.com/photo-1602525582399-7ef5f604ff7e?w=800&h=1000&fit=crop",
    category: "Chaquetas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Verde militar"],
  },
  {
    id: "8",
    name: "Chaqueta Denim Clásica",
    price: 219000,
    description: "Chaqueta de denim atemporal. Perfecta para combinar con cualquier outfit.",
    image: "https://images.unsplash.com/photo-1697678207669-0c52e2374648?w=800&h=1000&fit=crop",
    category: "Chaquetas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Azul", "Negro"],
  },
  {
    id: "9",
    name: "Gorra Minimal Negra",
    price: 59000,
    description: "Gorra de algodón con ajuste trasero. Diseño limpio y sin logos grandes.",
    image: "https://images.unsplash.com/photo-1527413232440-2cf20e325d6a?w=800&h=1000&fit=crop",
    category: "Accesorios",
    sizes: ["Única"],
    colors: ["Negro", "Beige", "Blanco"],
  },
  {
    id: "10",
    name: "Cinturón Cuero Marrón",
    price: 79000,
    description: "Cinturón de cuero genuino con hebilla metálica minimalista.",
    image: "https://images.unsplash.com/photo-1666723043169-22e29545675c?w=800&h=1000&fit=crop",
    category: "Accesorios",
    sizes: ["90", "95", "100", "105"],
    colors: ["Marrón", "Negro"],
  },
  {
    id: "11",
    name: "Camisa Oxford Blanca",
    price: 129000,
    description: "Camisa oxford de algodón. Corte regular, ideal para looks formales o casuales.",
    image: "https://images.unsplash.com/photo-1621773881532-fe65715b5137?w=800&h=1000&fit=crop",
    category: "Camisetas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanco", "Celeste", "Rosa"],
  },
  {
    id: "12",
    name: "Sudadera Crewneck Beige",
    price: 169000,
    description: "Sudadera sin capucha de felpa suave. Cuello redondo y ajuste cómodo.",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Gris", "Negro"],
  },
]

export const categories = [
  "Todos",
  "Camisetas",
  "Hoodies",
  "Pantalones",
  "Chaquetas",
  "Accesorios",
]