// import Image from "next/image"
// import RecipeCard from "@/components/recipes/RecipeCard"
import CardFlowbite from "@/components/recipes/CardFlowbite"
import { Recipe } from "../api/recipes/route"

async function fetchRecipes() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`, { cache: "no-store" })
  if (!res.ok) {
    throw new Error("404")
  }
  return await res.json()
}

export default async function RecipesPage() {
  const recipes: Recipe[] = await fetchRecipes()
  console.log(recipes)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6">Рецепты</h1>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe: Recipe) => (
          <CardFlowbite
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            description={recipe.description}
            image={recipe.imageUrl}
            showIngredientsBtn
            rating={recipe.rating}
            tags={recipe.tags}
          />
        ))}
      </ul>
    </div>
  )
}
