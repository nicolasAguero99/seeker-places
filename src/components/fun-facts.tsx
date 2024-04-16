import { useEffect, useState } from "react"

// Constants
import { FACTS } from "../constants/constants"

export default function FunFacts ({ isSearching } : { isSearching: boolean }) {
  const [facts, setFacts] = useState<string>('')

  useEffect(() => {
    if (!isSearching) return
    let prevRandomNumber = Math.floor(Math.random() * FACTS.length)
    setFacts(FACTS[prevRandomNumber])
    const interval = setInterval(() => {
      while (true) {
        const newRandomNumber = Math.floor(Math.random() * FACTS.length)
        if (newRandomNumber !== prevRandomNumber) {
          prevRandomNumber = newRandomNumber
          setFacts(FACTS[newRandomNumber])
          break
        }
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [isSearching])

  return (
    <p className='max-w-[650px] h-20 text-gray-500 text-sm text-center text-balance'>"{facts}."</p>
  )
}