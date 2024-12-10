import { Ingredient } from "@prisma/client";

interface IngredientListProps {
  ingredients: Ingredient[]
}

export default function IngredientList ({ingredients}: IngredientListProps){
 
  return (
    ingredients.map((item, index)=>(
      <li key={index}>{item.name}</li>
    )))
}