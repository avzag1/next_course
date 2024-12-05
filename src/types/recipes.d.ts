interface Recipe {
  id: number
  title: string
  description: string
  image: string
  ingredients: [number, string, string, []]
}