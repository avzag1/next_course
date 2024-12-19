"use client"
import { DarkThemeToggle, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Logo from "@/app/icon.png"
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation"

export default function MainMenu() {
  const pathname = usePathname()
  return (
    <Navbar fluid rounded>
      <NavbarBrand href="/" as={Link}>
        <Image src={Logo} className="mr-3 h-9 w-9" alt="Логотип" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white text-black">Книга рецептов</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <button className="btn-primary mr-4">Начать</button>
        <DarkThemeToggle/>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="/" active={pathname==="/"} as={Link}>
          Главная
        </NavbarLink>
        <NavbarLink href="/about" active={pathname==="/about"} as={Link}>О нас</NavbarLink>
        <NavbarLink href="/recipes" active={pathname==="/recipes"} as={Link}>Рецепты</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
