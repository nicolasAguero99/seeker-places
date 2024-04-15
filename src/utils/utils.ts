export function colorPriceRange(priceRangeLength: number) {
  if (priceRangeLength === 1) {
    return "text-green-600"
  } else if (priceRangeLength === 2) {
    return "text-yellow-600"
  } else if (priceRangeLength === 3) {
    return "text-orange-600"
  } else if (priceRangeLength === 4) {
    return "text-red-600"
  } else {
    return "text-gray-600"
  }
}

export function colorIconPriceRange (priceRangeLength: number) {
  if (priceRangeLength === 1) {
    return "#2DD881"
  } else if (priceRangeLength === 2) {
    return "#FBB13C"
  } else if (priceRangeLength === 3) {
    return "#B66D0D"
  } else if (priceRangeLength === 4) {
    return "#FE6847"
  } else {
    return "gray"
  }
}