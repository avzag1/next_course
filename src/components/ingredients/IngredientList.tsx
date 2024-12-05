
export default function IngredientList (ingredients: any[]){
 
  return (
    {ingredients}.map((item, index)=>(
      <li key={index}>{item}</li>
    ))

    )
}
