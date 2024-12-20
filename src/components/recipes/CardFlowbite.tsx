"use client"

import { useState, useEffect } from "react"
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import IngredientList from "@/components/ingredients/IngredientList"
import type { Ingredient, Chief } from "@prisma/client"
import RecipeRating from "@/components/recipes/RecipeRating"

interface RecipeCardProps {
  id: number
  title: string
  description: string
  image: string
  showIngredientsBtn?: boolean
  rating?: number
  tags?: string[]
}

import { Card } from "flowbite-react"

export default function CardFlowbite({ id, title, description, image, showIngredientsBtn = false, rating = 5, tags = [] }: RecipeCardProps) {
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
  const hideIngredients = () => setShowIngredients(false)

  return (   
      <Card
        className="max-w-[340px]"
        renderImage={() => (
          <Image
            width={300}
            height={200}
            src={image}
            alt={title}
            className="mb-4 rounded-lg mx-auto mt-5"
          />
        )}
      >
        <Link href={`/recipes/${id}`}>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        </Link>
        <p className="font-normal text-gray-700 dark:text-gray-400">{description}</p>
        <RecipeRating rating={rating} />
        <div className="text-sm text-gray-700 dark:text-gray-400 mb-4">Теги: {tags.join(", ")}</div>
        <button
          onClick={toggleLike}
          className="flex items-center space-x-2 mt-4"
        >
          {liked ? <SolidHeartIcon className="w-6 h-6 text-red-500" /> : <OutlineHeartIcon className="w-6 h-6 text-gray-500" />}
          <span className="text-gray-900 dark:text-gray-200">{liked ? "Вы поставили лайк!" : "Поставить лайк"}</span>
        </button>
        <div className="text-sm text-gray-700 dark:text-gray-400 mb-4">
          {showIngredients && ingredients.length > 0 && <IngredientList ingredients={ingredients} />}
          {showIngredientsBtn && (
            <button onClick={!showIngredients ? getIngredients : hideIngredients}>
              <span className="font-bold hover:underline">{showIngredients ? "Скрыть ингредиенты" : "Посмотреть ингредиенты"}</span>
            </button>
          )}
        </div>
      </Card>
  )
}
