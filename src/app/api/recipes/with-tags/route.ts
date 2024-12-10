import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function GET() {
  const recipes = await prisma.recipe.findMany({
    include: {
      ingredients: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  })

  return NextResponse.json(recipes)
}
