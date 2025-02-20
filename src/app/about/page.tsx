import Link from "next/link"
import type { Metadata } from "next"
import ImageWithButton from "./_components/ImageWithButton"
import { getServerSession } from "next-auth"
import {redirect} from "next/navigation"

export const metadata: Metadata = {
  title: "О нас",
}

export default async function AboutPage() {
  
const session = await getServerSession()
console.log(session);
if(!session){
  redirect("/auth/login?callbackUrl = /about")
}

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">О нас</h1>
      <p className="text-gray-700 text-lg">
        Добро пожаловать на наш сайт рецептов! Здесь вы найдете лучшие рецепты из разных уголков мира. Мы сремимся поделиться с вами не только
        вкусными рецептами, но и полезной информацией о приготовлении пищи.
      </p>
      <ImageWithButton/>
    </div>
  )
}
