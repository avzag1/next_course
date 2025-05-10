"use client"

import { useEffect } from "react"
import { useState } from "react"
import RecipeCard from "@/components/recipes/RecipeCard"

export default function Recipes() {

  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [ingredients, setIngredients] = useState<Recipe[]>([])
  const [ingLoading, setIngLoading] = useState<boolean>(false)
  const [ingError, setIngError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`)
        if (!res.ok) {
          throw new Error("404")
        }

        const data = await res.json()
        setRecipes(data)
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchRecipes()
  }, [])

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setIngLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredients`)
        if (!res.ok) {
          throw new Error("404")
        }

        const data = await res.json()
        setIngredients(data)
      } catch (error: unknown) {
        if (error instanceof Error) {
          setIngError(error.message)
        }
      } finally {
        setIngLoading(false)
      }
    }
    fetchIngredients()
  }, [])

  if (loading) {
    return <p className="text-center text-lg font-semibold">Загрузка</p>
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>
  }

  if (ingLoading) {
    return <p className="text-center text-lg font-semibold">Загрузка</p>
  }

  if (ingError) {
    return <p className="text-center text-lg text-red-500">{error}</p>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6">Рецепты</h1>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe: Recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            description={recipe.description}
            image={recipe.image}
            showIngredientsBtn
          />
        ))}
      </ul>
    </div>
  )
}
