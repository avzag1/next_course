import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const chiefs = [
  { name: "Chief 1", bio: "Эксперт в итальянской кухне." },
  { name: "Chief 2", bio: "Мастер пиццы и салатов." },
]

const recipes = [
  {
    title: "Спагетти Карбонара",
    description: "Классическая итальянская паста.",
    imageUrl: "/images/carbonara.jpg",
    ingredients: [
      { name: "Спагетти", amount: "200 г" },
      { name: "Яйца", amount: "2 шт" },
      { name: "Пармезан", amount: "50 г" },
      { name: "Бекон", amount: "100 г" },
    ],
    chiefs: ["Chief 1"],
    tags: ["Итальянская кухня", "Паста"],
    rating: 3,
  },
  {
    title: "Пицца Маргарита",
    description: "Свежая пицца с помидорами, базиликом и моцареллой.",
    imageUrl: "/images/pizza.jpg",
    ingredients: [
      { name: "Тесто", amount: "1 шт" },
      { name: "Томаты", amount: "2 шт" },
      { name: "Моцарелла", amount: "100 г" },
      { name: "Базилик", amount: "по вкусу" },
    ],
    chiefs: ["Chief 2"],
    tags: ["Итальянская кухня", "Пицца"],
    rating: 4,
  },
  {
    title: "Салат Цезарь",
    description: "Салат с салатом романо, гренками и соусом Цезарь.",
    imageUrl: "/images/salad.jpg",
    ingredients: [
      { name: "Салат романо", amount: "100 г" },
      { name: "Гренки", amount: "50 г" },
      { name: "Соус Цезарь", amount: "30 г" },
      { name: "Пармезан", amount: "20 г" },
    ],
    chiefs: ["Chief 1"],
    tags: ["Салат", "Классика"],
    rating: 5,
  },
]

async function main() {
  await prisma.ingredient.deleteMany()
  await prisma.recipe.deleteMany()
  await prisma.recipeChief.deleteMany()
  await prisma.recipeTag.deleteMany()
  await prisma.chief.deleteMany()
  await prisma.tag.deleteMany()

  // Создание chiefs
  const chiefMap: Record<string, number> = {}
  for (const chief of chiefs) {
    const createdChief = await prisma.chief.create({
      data: { name: chief.name, bio: chief.bio },
    })
    chiefMap[chief.name] = createdChief.id
  }

  // Создание тегов
  const tagMap: Record<string, number> = {}
  for (const recipe of recipes) {
    for (const tagName of recipe.tags) {
      if (!tagMap[tagName]) {
        const createdTag = await prisma.tag.create({
          data: { name: tagName },
        })
        tagMap[tagName] = createdTag.id
      }
    }
  }

  // for (const recipe of recipes) {
  //   const createdChiefs: Record<string, number> = {} // Динамический объект для хранения id поваров
  //   for (const chief of chiefs) {
  //     const createdChief = await prisma.chief.create({
  //       data: {
  //         name: chief.name,
  //         bio: chief.bio,
  //       },
  //     })
  //     createdChiefs[chief.name] = createdChief.id
  //   }

    // Создание рецептов
  for (const recipe of recipes) {
    const createdRecipe = await prisma.recipe.create({
      data: {
        title: recipe.title,
        description: recipe.description,
        imageUrl: recipe.imageUrl,
        rating: recipe.rating,
        ingredients: {
          create: recipe.ingredients.map((ingredient) => ({
            name: ingredient.name,
            amount: ingredient.amount,
          })),
        },
        tags: {
          create: recipe.tags.map((tagName) => ({
            tagId: tagMap[tagName],
          })),
        },
        chiefs: {
          create: recipe.chiefs.map((chiefName) => ({
            chiefId: chiefMap[chiefName],
          })),
        },
      },
    })
  }

  console.log("Seeding completed.")
}



  main()
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })

