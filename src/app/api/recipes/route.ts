import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export type Ingredient = {
  id: number;
  name: string;
  amount: string;
  recipeId: number;
};

export type Recipe = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  ingredients: Ingredient[];
  tags: string[]; // Массив строк для тегов
  chiefs: string[]; // Массив строк для поваров
};

export async function GET() {
  const recipes = await prisma.recipe.findMany({ include: { ingredients: true, tags: {include: {tag: true}}, chiefs: {include: {chief: true}} } })

  const formattedRecipes: Recipe[] = recipes.map((recipe) => ({
    ...recipe,
    tags: recipe.tags.map((recipeTag) => recipeTag.tag.name), // Преобразуем теги в массив строк
    chiefs: recipe.chiefs.map((recipeChief) => recipeChief.chief.name), // Преобразуем поваров в массив строк
  }));

  return NextResponse.json(formattedRecipes)
}

export async function POST(req: Request) {
  const { title, description, imageUrl, ingredients } = await req.json()
  // console.log("POST", title, description, imageUrl, ingredients)
  try {
    const newRecipe = await prisma.recipe.create({
      data: {
        title,
        description,
        imageUrl,
        ingredients: {
          create: ingredients,
        },
      },
    })
    return NextResponse.json(newRecipe, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Не удалось создать рецепт" }, { status: 500 })
  }
}
