import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

// Usuarios de demostración (solo para portafolio)
const users = [
  {
    id: "1",
    name: "Miguel Demo",
    email: "demo@modaurban.com",
    password: "123456",
  },
  {
    id: "2",
    name: "Usuario Test",
    email: "test@modaurban.com",
    password: "123456",
  },
]

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = users.find(
          (u) =>
            u.email === credentials.email &&
            u.password === credentials.password
        )

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})