# Moda Urbana

E-commerce de ropa minimalista desarrollado con **Next.js**, **TypeScript** y **Tailwind CSS**.

Proyecto orientado a demostrar un flujo completo de tienda online: catálogo de productos, carrito, autenticación, checkout y panel de administración.

🔗 **[Ver demo en vivo](https://ecomerce-ropa.vercel.app)**

---

## Características

- Catálogo de productos con filtros por categoría
- Página de detalle con selección de talla y color
- Carrito de compras persistente (localStorage)
- Cálculo de envío (gratis a partir de $150.000)
- Checkout con simulación de pasarela de pagos (Wompi)
- Autenticación de usuarios (Login / Registro)
- Panel de administración básico
- Diseño responsive y minimalista
- Notificaciones al agregar productos al carrito

---

## Tecnologías

| Tecnología                    | Uso                        |
|-------------------------------|----------------------------|
| **Next.js 16**                | Framework (App Router)     |
| **React 19** + **TypeScript** | Frontend tipado            |
| **Tailwind CSS 4**            | Estilos                    |
| **Auth.js (NextAuth v5)**     | Autenticación              |
| **Lucide React**              | Iconos                     |
| **Context API**               | Estado del carrito         |

---

## Flujo de compra

1. El usuario navega el catálogo y entra al detalle del producto
2. Selecciona talla y color → agrega al carrito
3. Revisa el carrito (con cálculo de envío)
4. Completa el formulario de checkout
5. Realiza el pago simulado con Wompi
6. Recibe confirmación del pedido

---

## Credenciales de demostración

| Rol     | Acceso                    | Contraseña |
|---------|---------------------------|------------|
| Usuario | `demo@modaurban.com`      | `123456`   |
| Admin   | Panel de administración   | `admin123` |

---

## Autor

**Miguel González**  
Desarrollador Frontend

---

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Miguel020103/ecomerce-ropa.git
cd ecomerce-ropa

# Instalar dependencias
npm install

# Variables de entorno
cp .env.example .env.local
# Configura AUTH_SECRET y AUTH_URL en .env.local

# Ejecutar en desarrollo
npm run dev
