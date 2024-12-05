"use client"

import { useState } from "react"
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import IngredientList, {Ingredient} from "@/components/ingredients/IngredientList"

interface RecipeCardProps {
  id: number
  title: string
  description: string
  image: string
  showIngredientsBtn?: boolean
}

export default function RecipeCard({ id, title, description, image, showIngredientsBtn=false }: RecipeCardProps) {
  const [liked, setLiked] = useState(false)
const [showIngredients, setShowIngredients] = useState(false)
const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const toggleLike = () => {
    setLiked(!liked)
  }

  const getIngredients = async () =>{
    setShowIngredients(true)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredients/${id}`)
    const data = await res.json()
    setIngredients(data)
  }

  const hideIngredients = () => setShowIngredients(false)

    return (
    <li className="border p-4 rounded-lg shadow-lg list-none">
      <Link href={`/recipes/${id}`}>
        <Image
          src={image}
          width={300}
          height={200}
          alt={title}
          className="mb-4 rounded-lg"
        />
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-700 mb-4">{description}</p>
      </Link>
      <button
        onClick={toggleLike}
        className="flex items-center space-x-2 mt-4"
      >
        {liked ? <SolidHeartIcon className="w-6 h-6 text-red-500" /> : <OutlineHeartIcon className="w-6 h-6 text-gray-500" />}
        <span>{liked ? "Вы поставили лайк!" : "Поставить лайк"}</span>
      </button>
      {showIngredients && ingredients.length > 0 && <IngredientList ingredients={ingredients}/>}
      {showIngredientsBtn && (
       <button onClick={!showIngredients ? getIngredients : hideIngredients}>
<span>{showIngredients ? "Скрыть ингредиенты" : "Посмотреть ингредиенты"}</span>
       </button> 
      )}

    </li>
  )
}
