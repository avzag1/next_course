import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"
// const recipes = [
//   {
//     id: 1,
//     title: "Спагетти Карбонара",
//     description: "Классическая итальянская паста.",
//     image: "/images/carbonara.jpg"
//   },
//   {
//     id: 2,
//     title: "Пицца Маргарита",
//     description: "Свежая пицца с помидорами, базиликом и моцареллой.",
//     image: "/images/pizza.jpg"
//   },
//   {
//     id: 3,
//     title: "Салат Цезарь",
//     description: "Салат с салатом романо, гренками и соусом Цезарь.",
//     image: "/images/salad.jpg",
//   },
// ]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const recipeId = parseInt(params.id, 10)

  try {
    const recipe = await prisma.recipe.findFirst({
      where: { id: recipeId },
      include: {
        ingredients: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!recipe) {
      return NextResponse.json({ error: "Рецепт не найден" }, { status: 404 });
    }

    const formattedRecipe = {
      ...recipe,
      tags: recipe.tags.map((recipeTag) => recipeTag.tag.name), // Преобразуем теги в массив строк
    };

    return NextResponse.json(formattedRecipe);
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Рецепт не найден" }, { status: 404 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const recipeId = parseInt(params.id, 10)
  const { title, description, imageUrl } = await req.json()
  try {
    const updatedRecipe = await prisma.recipe.update({
      where: { id: recipeId },
      data: { title, description, imageUrl },
    })
    
    return NextResponse.json(updatedRecipe, {status: 200})
  } catch (error) {
    // console.error(error)
    return NextResponse.json({ error: "Не удалось обновить рецепт" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const recipeId = parseInt(params.id, 10)
  try {
    // await prisma.ingredient.deleteMany({
    //   where: {id: recipeId}
    // })
    const deletedRecipe = await prisma.recipe.delete({
      where: { id: recipeId },
    })
    
    return NextResponse.json(deletedRecipe, {status: 200})
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Не удалось удалить рецепт" }, { status: 500 })
  }
}
