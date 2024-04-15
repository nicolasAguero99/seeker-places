// Utils
import { colorIconPriceRange } from "../../utils/utils"

export default function DollarIcon({ priceRangeLength = 0 }) {
  const color = colorIconPriceRange(priceRangeLength)

  return (
    <svg width='22' height='22' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 8.5V8.35417C18 6.50171 16.4983 5 14.6458 5H9.5C7.567 5 6 6.567 6 8.5C6 10.433 7.567 12 9.5 12H14.5C16.433 12 18 13.567 18 15.5C18 17.433 16.433 19 14.5 19H9.42708C7.53436 19 6 17.4656 6 15.5729V15.5M12 3V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g>
    </svg>
  )
}