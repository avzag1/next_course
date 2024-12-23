import { Rating } from "flowbite-react"

export default function RecipeRating({ rating }: { rating: number }) {
  return (
    <Rating>
      {Array.from({ length: 5 }, (_, index) => (
        <Rating.Star
          key={index}
          filled={index < Math.round(rating)}
        />
      ))}
    </Rating>
  )
}
