import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const recipeId = parseInt(params.id, 10);

  if (isNaN(recipeId)) {
    return NextResponse.json({ error: "Invalid recipe ID" }, { status: 400 });
  }

  try {
    // Запрос для получения всех шефов по ID рецепта
    const chiefs = await prisma.recipeChief.findMany({
      where: { recipeId },
      include: {
        chief: true,
      },
    });

    // Извлекаем только объекты Chef
    const chefsOnly = chiefs.map((rc) => rc.chief);

    return NextResponse.json(chefsOnly);
  } catch (error) {
    console.error("Error fetching chiefs:", error);
    return NextResponse.json({ error: "Failed to fetch chiefs" }, { status: 500 });
  }
}
