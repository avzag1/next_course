import Link from "next/link"
import type { Metadata } from "next"
import RecipeCard from "@/components/recipes/RecipeCard"
import type { Recipe } from "@prisma/client"
import HeroSection from "@/components/HeroSection"

export const metadata: Metadata = {
  title: "Книга рецептов",
  description: "Книга рецептов. Делитесь любимыми рецептами и открывайте для себя новые",
}

// async function fetchRecipeById() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${process.env.NEXT_PUBLIC_MAIN_RECIPE_ID}`, { cache: "no-store" })
//   if (!res.ok) {
//     throw new Error("404")
//   }
//   return await res.json()
// }

async function fetchRecipeById(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`, { cache: "no-store" })
  if (!res.ok) {
    throw new Error("404")
  }
  return await res.json() as Recipe
}

// const recipe: Recipe = await fetchRecipeById()

export default async function Home(): Promise<React.JSX.Element> {
  const id = process.env.NEXT_PUBLIC_MAIN_RECIPE_ID ?? null
  const dailyRecipe = id ? await fetchRecipeById(id) : null

  return (
    <div className="container mx-auto p-4">
      <HeroSection
        headline="Откройте для себя мир кулинарных шедевров"
        subheadline="Добро пожаловать в книгу рецептов, где каждый рецепт – это маленький праздник! Найдите вдохновение для создания удивительных блюд, которые порадуют вас и ваших близких."
        primaryBtnText="Узнать больше"
        primaryBtnLink="/about"
        secondaryBtnText="Смотреть видео"
        secondaryBtnLink="/watch-demo"
        alertText="Попробуйте наши самые популярные рецепты!"
        alertLink="/recipes"
        alertBadge="Новинка"
        popularText="Популярно"
        images={[
          { href: "/recipes/1", src: "/images/carbonara.jpg", alt: "Carbonara", width: 80, height: 40 },
          { href: "/recipes", src: "/images/omelette.jpg", alt: "Omelette", width: 100, height: 50 },
          { href: "/recipes/2", src: "/images/pizza.jpg", alt: "Pizza", width: 100, height: 50 },
          { href: "/recipes/1", src: "/images/carbonara.jpg", alt: "Carbonara", width: 80, height: 40 },
          { href: "/recipes/3", src: "/images/salad.jpg", alt: "Salad", width: 90, height: 45 },
        ]}
      />
      
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