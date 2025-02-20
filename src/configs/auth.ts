import { passwordSchema } from "@/app/auth/_models/schema"
import NextAuth, { AuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import EmailProvider from "next-auth/providers/email"
import bcrypt from "bcryptjs"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/libs/prisma"
// import { mailOptions, transporter } from "./nodemailer"

const users = [
  // { id: "1", name: "Anna", email: "test@example.local", password: "12345678" },
  // { id: "2", name: "Vika", email: "vika@example.local", password: "12345678" },

  { id: "1", name: "Anna", email: "test@example.local", password: "$2b$10$VyaMwBHZU9DUfF7Eepwb4uADQLniUwpq907qrb7xGdCxSC3TkRxyi" },
  { id: "2", name: "Vika", email: "vika@example.local", password: "$2b$10$B6TuNTrFM7yP.NYncdAoM.n15CS7UMvLpXVq9kzCwnyJEHiAE4rGm" },
]

console.log(bcrypt.hashSync("12345678"))

const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? "",
  session: {
    strategy: "jwt",
    maxAge: 90 * 24 * 60 * 60,
  },
  pages: {
    //для редиректа
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        // const user = users.find((u) => u.email === email && u.password === password)

        const { email, password } = await passwordSchema.parseAsync(credentials)
        const user = users.find((u) => u.email === email)

        if (!user) {
          throw new Error("Неправильный email или пароль")
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password)
        if (!isPasswordValid) {
          throw new Error("Неправильный email или пароль")
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id,
        token.name = user.name,
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (token)
        session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
      }
      return session
    },
  },
}

export default NextAuth(authOptions)
