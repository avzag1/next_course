"use client"

import { useState, useEffect } from "react"
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import IngredientList from "@/components/ingredients/IngredientList"
import type { Ingredient } from "@prisma/client"
import type { Chief } from "@prisma/client"
import RecipeRating from "@/components/recipes/RecipeRating"

interface RecipeCardProps {
  id: number
  title: string
  description: string
  image: string
  showIngredientsBtn?: boolean
  rating?: number
  tags?: [string]
}

export default function RecipeCard({ id, title, description, image, showIngredientsBtn = false, rating, tags }: RecipeCardProps) {
  const [liked, setLiked] = useState(false)
  const [showIngredients, setShowIngredients] = useState(false)
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [chiefs, setChiefs] = useState<Chief[]>([])
  const toggleLike = () => {
    setLiked(!liked)
  }

  const getIngredients = async () => {
    setShowIngredients(true)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredients/${id}`)
    const data = await res.json()
    setIngredients(data)
  }

  useEffect(() => {
    const showChief = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}/chiefs`)
        const data = (await res.json()) as Chief[]
        setChiefs(data)
      } catch {
        console.log("Error")
      }
    }

    showChief()
  }, [])
  console.log(chiefs.map((chief) => chief.name).join(', '));
  const hideIngredients = () => setShowIngredients(false)

  return (
    <li className="border p-4 rounded-lg shadow-lg list-none bg-white dark:bg-gray-800 dark:border-gray-700">
      <Link href={`/recipes/${id}`}>
        <Image
          src={image}
          width={300}
          height={200}
          alt={title}
          className="mb-4 rounded-lg"
        />
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-700 dark:text-gray-400 mb-4">{description}</p>
        <p className="text-sm text-gray-700 dark:text-gray-400 mb-4 py-5 bg-yellow-100 "></p>
        <div>{chiefs.map((chief) => chief.name).join(', ')}</div>
        
        <RecipeRating />
      </Link>
      <button
        onClick={toggleLike}
        className="flex items-center space-x-2 mt-4"
      >
        {liked ? <SolidHeartIcon className="w-6 h-6 text-red-500" /> : <OutlineHeartIcon className="w-6 h-6 text-gray-500" />}
        <span className="text-gray-900 dark:text-gray-200">{liked ? "Вы поставили лайк!" : "Поставить лайк"}</span>
      </button>

      {showIngredients && ingredients.length > 0 && <IngredientList ingredients={ingredients} />}
      {showIngredientsBtn && (
        <button onClick={!showIngredients ? getIngredients : hideIngredients}>
          <span>{showIngredients ? "Скрыть ингредиенты" : "Посмотреть ингредиенты"}</span>
        </button>
      )}
    </li>
  )
}
