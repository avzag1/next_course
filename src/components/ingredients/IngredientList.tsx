// export type Ingredient = string

// export default function IngredientList (ingredients: Ingredient[]){
//   console.log(ingredients);
//   return (
    
//     ingredients.map((item, index)=>(
//       <li key={index}>{item}</li>
//     ))

//     )
// }

import { Ingredient } from "@/app/api/ingredients/[id]/route";

interface IngredientListProps {
  ingredients: Ingredient[]
}

export default function IngredientList ({ingredients}: IngredientListProps){
 
  return (
    ingredients.map((item, index)=>(
      <li key={index}>{item.name}</li>
    )))
}