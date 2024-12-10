import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function GET() {
  const ingredients = await prisma.ingredient.findMany()
  return NextResponse.json(ingredients)
}

export async function POST(req: Request) {
  const { id, name, amount, recipeId } = await req.json()
  console.log("POST", id, name, amount, recipeId)
  try {
    const newIngredient = await prisma.ingredient.create({
      data: {
        name,
        amount,
        recipeId,
      },
    })
    return NextResponse.json(newIngredient, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Не удалось создать ингредиент" }, { status: 500 })
  }
}
