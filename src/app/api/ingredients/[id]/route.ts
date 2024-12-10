import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const recipeId = parseInt(params.id, 10)

  try {
    const ingredient = await prisma.ingredient.findMany({
      where: { recipeId: recipeId },
    })

    if (!ingredient) {
      throw new Error("Ингредиент не найден")
    }

    return NextResponse.json(ingredient)
  } catch (error) {
    // console.error(error)
    return NextResponse.json({ error: "Ингредиент не найден" }, { status: 404 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const ingredientId = parseInt(params.id, 10)
  const { name, amount } = await req.json()
  try {
    const updatedRecipe = await prisma.ingredient.update({
      where: { id: ingredientId },
      data: { name, amount },
    })
    
    return NextResponse.json(updatedRecipe, {status: 200})
  } catch (error) {
    // console.error(error)
    return NextResponse.json({ error: "Не удалось обновить рецепт" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const ingredientId = parseInt(params.id, 10)
  try {
    // await prisma.ingredient.deleteMany({
    //   where: {id: recipeId}
    // })
    const deletedIngredient = await prisma.ingredient.delete({
      where: { id: ingredientId },
    })
    
    return NextResponse.json(deletedIngredient, {status: 200})
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Не удалось удалить рецепт" }, { status: 500 })
  }
}