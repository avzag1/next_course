import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function GET() {
  const recipes = await prisma.recipe.findMany({
    include: {
      chiefs: {
        include: {
          chief: true,
        },
      },
    },
  })

  return NextResponse.json(recipes)
}
