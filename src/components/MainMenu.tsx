"use client"
import { DarkThemeToggle, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Logo from "@/app/icon.png"
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation"
import { signOut, useSession } from "next-auth/react"

export default function MainMenu() {
  const pathname = usePathname()
  const { data: session } = useSession()
  console.log(session);
  const onSignOutHandle = () => {
    signOut()
  }
  return (
    <Navbar fluid rounded>
      <NavbarBrand href="/" as={Link}>
        <Image src={Logo} className="mr-3 h-9 w-9" alt="Логотип" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white text-black">Книга рецептов</span>
      </NavbarBrand>
      <div className="flex md:order-2">
{session &&(
  <div>
    <span className="text-black dark:text-white mr-2">{session.user?.email}</span>
    <button onClick={onSignOutHandle} className="btn-primary mr-4 p-2">Выход</button>
    </div>
)}
{!session &&(
  <div>
    <Link href="/auth/login">
    <button className="btn-primary mr-4 p-2">Войти</button>
    </Link>
    </div>
)}
        
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
