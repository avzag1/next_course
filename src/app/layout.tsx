import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { NavLinks } from "@/components/NavLinks"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Книга рецептов",
  description: "Книга рецептов. Делитесь любимыми рецептами и открывайте для себя новые"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="bg-gray-200 text-white p-4">
<div className="container mx-auto flex justify-between items-center">
  <NavLinks/>
</div>
        </header>
        <main className="flex-grow p-4">
        {children}
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; 2024 Все права защищены
        </footer>
      </body>
    </html>
  )
}
