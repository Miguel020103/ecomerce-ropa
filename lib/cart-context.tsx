"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { Product } from "./products"

export type CartItem = {
  product: Product
  quantity: number
  size: string
  color: string
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (product: Product, size: string, color: string) => void
  removeFromCart: (productId: string, size: string, color: string) => void
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product, size: string, color: string) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.color === color
      )

      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prev, { product, quantity: 1, size, color }]
    })
  }

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.size === size &&
            item.color === color
          )
      )
    )
  }

  const updateQuantity = (
    productId: string,
    size: string,
    color: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color)
      return
    }

    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.size === size &&
        item.color === color
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => setCart([])

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart debe usarse dentro de un CartProvider")
  }
  return context
}