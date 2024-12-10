import Link from "next/link"
import type { Metadata } from "next"
import RecipeCard from "@/components/recipes/RecipeCard"
import type { Recipe } from "@prisma/client"

export const metadata: Metadata = {
  title: "Книга рецептов",
  description: "Книга рецептов. Делитесь любимыми рецептами и открывайте для себя новые",
}

async function fetchRecipeById() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${process.env.NEXT_PUBLIC_MAIN_RECIPE_ID}`, { cache: "no-store" })
  if (!res.ok) {
    throw new Error("404")
  }
  return await res.json()
}

export default async function Home(): Promise<React.JSX.Element> {
  const id = process.env.NEXT_PUBLIC_MAIN_RECIPE_ID ?? null
  const dailyRecipe = id ? await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`).then((res) => res.json()) : null

  const recipe: Recipe = await fetchRecipeById()
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">Добро пожаловать на страницу рецептов</h1>
      <p className="mx-4 text-lg mt-4">Делитесь любимыми рецептами и открывайте для себя новые!</p>

      <nav className="mt-6">
        <Link
          className="text-blue-500 hover:underline"
          href="/recipes"
        >
          Посмотреть рецепты
        </Link>
      </nav>
      {dailyRecipe && (
        <>
          <h2 className="text-2xl mt-12 mb-4 font-semi">Рекомендуемый рецепт</h2>
          <div className="w-fit">
            <RecipeCard
              id={dailyRecipe.id}
              title={dailyRecipe.title}
              description={dailyRecipe.description}
              image={dailyRecipe.imageUrl}
              showIngredientsBtn
            />
          </div>
        </>
      )}
    </div>
  )
}
