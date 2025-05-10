import { NextResponse } from "next/server"

export async function GET() {
  const recipes = [
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

  //Задержка
  await new Promise((resolve) => setTimeout(resolve, 3000))

  const ing:any[] = []
  const ingredienList:any[] = []

  for (let item of recipes){
    ing.push(item.ingredients)
  }
  for(let item of ing){
    if(ingredienList.includes(item.name))
    ingredienList.push(item.name)
  }

  return NextResponse.json(ingredienList)
}

