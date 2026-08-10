# Moda Urbana — E-commerce de Ropa

Tienda online de ropa minimalista desarrollada con **Next.js**, **TypeScript** y **Tailwind CSS**.  
Proyecto de portafolio orientado a demostrar un flujo completo de e-commerce moderno.

🔗 **Demo en vivo:** _(agregar link de Vercel cuando lo despliegues)_

---

## Características

- Catálogo de productos con página de detalle
- Selección de talla y color
- Carrito de compras persistente (localStorage)
- Cálculo de envío (gratis a partir de $150.000)
- Checkout completo con simulación de pasarela de pagos (Wompi)
- Autenticación de usuarios (Login / Registro)
- Diseño responsive y minimalista
- Notificaciones al agregar productos al carrito

---

## Tecnologías

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **Auth.js (NextAuth v5)** — autenticación
- **Lucide React** — iconos
- Context API — estado del carrito

---

## Flujo de compra

1. El usuario navega el catálogo y ve el detalle del producto
2. Selecciona talla y color → agrega al carrito
3. Revisa el carrito (con cálculo de envío)
4. Completa el formulario de checkout
5. Realiza el pago simulado con Wompi
6. Recibe confirmación del pedido

---

## Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/Miguel020103/ecomerce-ropa.git
cd ecomerce-ropa

# Instalar dependencias
npm install

# Variables de entorno
cp .env.example .env.local
# (o crea .env.local con AUTH_SECRET y AUTH_URL)

# Correr en desarrollo
npm run dev