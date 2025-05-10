import { NextResponse } from "next/server"

export interface Ingredient {
  id: number;
  name: string;
  amount: string;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
}

const recipes: Recipe[] = [
  {
    id: 1,
    title: "Спагетти Карбонара",
    description: "Классическая итальянская паста.",
    image: "/images/carbonara.jpg",
    ingredients: [
      { id: 1, name: "Спагетти", amount: "200 г" },
      { id: 2, name: "Яйца", amount: "2 шт" },
      { id: 3, name: "Пармезан", amount: "50 г" },
      { id: 4, name: "Бекон", amount: "100 г" },
    ],
  },
  {
    id: 2,
    title: "Пицца Маргарита",
    description: "Свежая пицца с помидорами, базиликом и моцареллой.",
    image: "/images/pizza.jpg",
    ingredients: [
      { id: 1, name: "Спагетти", amount: "1 шт" },
      { id: 2, name: "Яйца", amount: "2 шт" },
      { id: 3, name: "Пармезан", amount: "100 г" },
      { id: 4, name: "Бекон", amount: "по вкусу" },
    ],
  },
  {
    id: 3,
    title: "Салат Цезарь",
    description: "Салат с салатом романо, гренками и соусом Цезарь.",
    image: "/images/salad.jpg",
    ingredients: [
      { id: 1, name: "Яйца", amount: "1 шт" },
      { id: 2, name: "Ветчина", amount: "150 г" },
      { id: 3, name: "Пармезан", amount: "100 г" },
      { id: 4, name: "Масло", amount: "15 г" },
    ],
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const recipeId = parseInt(params.id, 10)
  const ingredients = recipes.find((r) => r.id === recipeId)?.ingredients
  if (!ingredients) {
    return NextResponse.json({ error: "Ингредиенты не найдены" }, { status: 404 })
  }

  return NextResponse.json(ingredients)
}
