import Recipes from "./_components/Recipes"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Рецепты",
}

export default function RecipesPage() {
  return <Recipes />
}
