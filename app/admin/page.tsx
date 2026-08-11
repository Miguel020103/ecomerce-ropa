"use client"

import { useState, useEffect } from "react"
import { getProducts, saveProducts, Product } from "@/lib/products"
import { formatPrice } from "@/lib/utils"
import { Trash2, Plus, Lock, X } from "lucide-react"
import Link from "next/link"

const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36"]
const availableColors = ["Negro", "Blanco", "Gris", "Beige", "Azul", "Azul Marino", "Camel", "Rojo", "Verde"]

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [loaded, setLoaded] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
  })

  const ADMIN_PASSWORD = "admin123"

  useEffect(() => {
    setProducts(getProducts())
    setLoaded(true)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Contraseña incorrecta")
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          images: [...prev.images, reader.result as string],
        }))
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const toggleSize = (size: string) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }))
  }

  const toggleColor = (color: string) => {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }))
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.name || !form.price || !form.category) {
      alert("Completa los campos obligatorios")
      return
    }

    if (form.images.length === 0) {
      alert("Por favor sube al menos una imagen")
      return
    }

    if (form.sizes.length === 0) {
      alert("Selecciona al menos una talla")
      return
    }

    if (form.colors.length === 0) {
      alert("Selecciona al menos un color")
      return
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: form.name,
      description: form.description || "Sin descripción",
      price: Number(form.price),
      category: form.category,
      image: form.images[0],
      images: form.images,
      sizes: form.sizes,
      colors: form.colors,
    }

    const updated = [newProduct, ...products]
    setProducts(updated)
    saveProducts(updated)

    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      images: [],
      sizes: [],
      colors: [],
    })
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Eliminar este producto?")) {
      const updated = products.filter((p) => p.id !== id)
      setProducts(updated)
      saveProducts(updated)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={20} className="text-gray-600" />
            </div>
            <h1 className="text-xl font-medium mb-2">Panel de Administración</h1>
            <p className="text-sm text-gray-500">Ingresa la contraseña para continuar</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black"
              required
            />
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <button type="submit" className="w-full bg-black text-white py-3 text-sm hover:bg-gray-800 transition">
              Entrar
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-6">
            Contraseña de demo: <span className="font-mono">admin123</span>
          </p>

          <div className="text-center mt-6">
            <Link href="/" className="text-sm text-gray-500 hover:text-black transition">
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-1">Administración</p>
          <h1 className="text-2xl font-medium">Panel de Productos</h1>
        </div>

        <div className="flex gap-3">
          <Link href="/" className="px-4 py-2 text-sm border border-gray-200 hover:border-gray-400 transition">
            Volver a la tienda
          </Link>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 text-sm hover:bg-gray-800 transition"
          >
            <Plus size={16} />
            {showForm ? "Cancelar" : "Agregar producto"}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAddProduct} className="bg-gray-50 border border-gray-100 p-6 mb-10 rounded-lg space-y-5">
          <h2 className="font-medium mb-2">Nuevo producto</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nombre del producto *"
              className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black"
              required
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black bg-white"
              required
            >
              <option value="">Selecciona una categoría *</option>
              <option value="Camisetas">Camisetas</option>
              <option value="Pantalones">Pantalones</option>
              <option value="Sudaderas">Sudaderas</option>
              <option value="Chaquetas">Chaquetas</option>
              <option value="Camisas">Camisas</option>
              <option value="Blazers">Blazers</option>
              <option value="Vestidos">Vestidos</option>
              <option value="Abrigos">Abrigos</option>
              <option value="Tops">Tops</option>
              <option value="Faldas">Faldas</option>
            </select>

            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Precio *"
              className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black"
              required
            />
          </div>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descripción"
            rows={3}
            className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black"
          />

          {/* Tallas */}
          <div>
            <p className="text-sm text-gray-600 mb-3">Tallas disponibles: *</p>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-1.5 text-sm border transition ${
                    form.sizes.includes(size)
                      ? "bg-black text-white border-black"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colores */}
          <div>
            <p className="text-sm text-gray-600 mb-3">Colores disponibles: *</p>
            <div className="flex flex-wrap gap-2">
              {availableColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => toggleColor(color)}
                  className={`px-3 py-1.5 text-sm border transition ${
                    form.colors.includes(color)
                      ? "bg-black text-white border-black"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Subir varias imágenes */}
          <div>
            <p className="text-sm text-gray-600 mb-3">
              Sube una o varias imágenes: *
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:border-0 file:text-sm file:font-medium
                file:bg-black file:text-white
                hover:file:bg-gray-800 file:cursor-pointer"
            />

            {form.images.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {form.images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`Imagen ${index + 1}`}
                      className="w-24 h-32 object-cover border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" className="bg-black text-white px-6 py-3 text-sm hover:bg-gray-800 transition">
            Guardar producto
          </button>
        </form>
      )}

      {!loaded ? (
        <p className="text-center text-gray-500 py-12">Cargando productos...</p>
      ) : (
        <div className="border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-500">Producto</th>
                <th className="px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Categoría</th>
                <th className="px-4 py-3 font-medium text-gray-500">Precio</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-gray-100">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-12 h-14 object-cover bg-gray-50" />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-500 hidden md:table-cell">{product.category}</td>
                  <td className="px-4 py-4">{formatPrice(product.price)}</td>
                  <td className="px-4 py-4 text-right">
                    <button onClick={() => handleDelete(product.id)} className="text-gray-400 hover:text-red-500 transition">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {loaded && products.length === 0 && (
        <p className="text-center text-gray-500 py-12">No hay productos. Agrega el primero.</p>
      )}
    </div>
  )
}