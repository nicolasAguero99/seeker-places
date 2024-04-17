import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

// Types
import { type Location } from '../types/types'

// Constants
import { ADDRESSES, API_URL } from '../constants/constants'

// Components
import PlacesList from './places-list'
import AddressesList from './addresses-list'

export default function Form() {
  const [location, setLocation] = useState("")
  const [placesLength, setPlacesLength] = useState(5)
  const [locationsArray, setLocationsArray] = useState<Location[] | []>([])
  const [debouncedValue] = useDebounce(location, 500)
  const [randomPlaceholders, setRandomPlaceholders] = useState<string>('')
  const [imageNumber, setImageNumber] = useState<number>(0)
  const [places, setPlaces] = useState([])
  const [isSelecting, setIsSelecting] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const randomNumberAddress = Math.floor(Math.random() * ADDRESSES.length)
    const randomNumberImage = Math.floor(Math.random() * 4) + 1
    setRandomPlaceholders(ADDRESSES[randomNumberAddress])
    setImageNumber(randomNumberImage)
  }, [])

  useEffect(() => {
    if (placesLength < 1) setPlacesLength(1)
    if (placesLength > 20) setPlacesLength(20)
  }, [placesLength])

  useEffect(() => {
    if (isSelecting) return
    searchAddress(location)
  }, [debouncedValue])

  const handleTypeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value)
    isSelecting && setIsSelecting(false)
  }

  const handleSelectAddress = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsSelecting(true)
    setLocation(e.currentTarget.value)
    setLocationsArray([])
  }

  const handleTypeLocationLength = (e: React.ChangeEvent<HTMLInputElement>) => setPlacesLength(Number(e.currentTarget.value))

  const handleSubmit = async (event: React.FormEvent) => {
    setIsSearching(true)
    setPlaces([])
    setLocationsArray([])
    event.preventDefault()
    try {
      const res = await fetch(`${API_URL}/search-places`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location, placesLength }),
      })
      if (!res.ok) {
        console.error("Error al enviar la petición")
        setIsSearching(false)
        return
      }
      const data = await res.json()
      setPlaces(data)
      setIsSearching(false)
    }
    catch (error) {
      console.error("Error al enviar la petición")
      setIsSearching(false)
    }
  }

  const searchAddress = async (query: string) => {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&accept-language=es`)
    const data: Location[] = await res.json()
    if (data == null) return
    setLocationsArray(data)
  }

  return (
    <>
    {/* <button className='bg-red-700' onClick={() => setIsSearching(!isSearching)}>CLICK</button> */}
      <form onSubmit={handleSubmit} className='relative max-w-[650px] m-auto'>
        <div className='w-full flex flex-col items-center gap-2'>
          <input
            className='text-black w-full py-2 px-4 rounded-lg shadow-md'
            type='text'
            placeholder={`Ej: ${randomPlaceholders}`}
            value={location}
            onChange={handleTypeAddress}
          />
          <div className='w-full flex gap-2 max-[550px]:flex-col'>
            <div className='flex items-center bg-white rounded-lg shadow-md'>
              <label htmlFor='places-length' className='relative text-secondaryText text-sm whitespace-nowrap px-2 after:absolute after:right-0 after:w-[1px] after:h-full after:bg-secondaryText/50'>Cantidad de lugares</label>
              <input
                className='text-black py-2 px-4 rounded-r-lg outline-none'
                type='number'
                min={1}
                max={20}
                id='places-length'
                value={placesLength}
                onChange={handleTypeLocationLength}
              />
            </div>
            <button className={`w-full animate-shimmer rounded-md ${!isSearching ? 'bg-black' : 'bg-[linear-gradient(110deg,#000103,45%,#A8A8A8,70%,#000103)]'} bg-[length:200%_100%] py-2 px-6 font-medium text-white transition-all duration-300 hover:outline-none hover:ring-2 hover:ring-slate-400 hover:ring-offset-2 hover:ring-offset-slate-50 hover:scale-95`} type='submit'>
              {!isSearching ? 'Buscar' : 'Buscando...'}
            </button>
          </div>
        </div>
        <AddressesList locationsArray={locationsArray} location={location} handleSelectAddress={handleSelectAddress} />
      </form>
      <PlacesList isSearching={isSearching} imageNumber={imageNumber} places={places} />
    </>
  )
}
