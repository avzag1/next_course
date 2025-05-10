"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

export function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="flex space-x-4">
      <Link
        href="/"
        className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === "/" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"}`}
      >
        Главная
      </Link>
      <Link
        href="/about"
        className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === "/about" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"}`}
      >
        О нас
      </Link>
      <Link
        href="/recipes"
        className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === "/recipes" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"}`}
      >
        Рецепты
      </Link>
      <Link
        href="/recipes-csr"
        className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === "/recipes-csr" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"}`}
      >
        Рецепты CSR
      </Link>
      {/* <Link
        href="/admin"
        className={`px-3 py-2 rounded-md text-sm font-medium ${(pathname === "admin" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200")}`}
      >
        Админ
      </Link> */}
    </nav>
  )
}
