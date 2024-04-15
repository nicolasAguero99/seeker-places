import { useEffect, useState } from 'react'

// Types
import { type Location } from '../types/types'

// Utils
import { colorPriceRange } from '../utils/utils'

// Icons
import DollarIcon from './icons/dollar-icon'

// Ui
import { World } from './ui/globe'

// Data
import { globeConfig, sampleArcs } from '../data/globe-config'

// Constants
import { ADDRESSES } from '../constants/constants'
import FunFacts from './fun-facts'
import { useDebounce } from 'use-debounce'

export default function Form() {
  const [location, setLocation] = useState("")
  const [placesLength, setPlacesLength] = useState(5)
  const [locationsArray, setLocationsArray] = useState<Location[] | []>([])
  const [debouncedValue] = useDebounce(location, 500)
  const [randomPlaceholders, setRandomPlaceholders] = useState<string>('')
  const [places, setPlaces] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const randomNumberAddress = Math.floor(Math.random() * ADDRESSES.length)
    setRandomPlaceholders(ADDRESSES[randomNumberAddress])
  }, [])

  useEffect(() => {
    if (placesLength < 1) setPlacesLength(1)
    if (placesLength > 20) setPlacesLength(20)
  }, [placesLength])

  useEffect(() => {
    searchAddress(location)
  }, [debouncedValue])

  const handleTypeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value)
    // searchAddress(e.target.value)
  }

  const handleSelectAddress = (e: React.MouseEvent<HTMLButtonElement>) => {
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
      const res = await fetch("http://127.0.0.1:8000/search-places", {
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
    <button className='bg-red-700' onClick={() => setIsSearching(!isSearching)}>CLICK</button>
      <form onSubmit={handleSubmit} className='relative max-w-[650px] m-auto'>
        <div className='w-full flex flex-col items-center gap-2'>
          <input
            className='text-black w-full py-2 px-4 rounded-lg shadow-md'
            type='text'
            placeholder={`Ej: ${randomPlaceholders}`}
            value={location}
            onChange={handleTypeAddress}
          />
          <div className='w-full flex gap-2'>
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
        
          {
            locationsArray.length > 0
              ? <div className='absolute top-11 left-0 right-0 mx-auto flex flex-col divide-y-[1px] divide-gray-300 bg-slate-100 text-black w-full px-4 rounded-lg shadow-lg'>
                  {
                    locationsArray.map((location: Location) => (
                      <button
                        className='py-2'
                        key={location.place_id}
                        value={location.display_name}
                        type='button'
                        onClick={handleSelectAddress}
                      >
                        {location.display_name}
                      </button>
                    ))
                  }
                </div>
              : <div className='mt-6 text-center'>
                  <p className='text-secondaryText'>Recuerda que mientras más cantidad de lugares busques, más tiempo de espera...</p>
                </div>
          }
      </form>
      {
        isSearching
          ? <section className='w-full flex flex-col gap-4 items-center'>
              <div className='w-[720px] h-[580px] mx-auto'>
                <World data={sampleArcs} globeConfig={globeConfig} />
              </div>
              <span className='text-2xl'>Buscando... (Esto puede tardar unos segundos)</span>
              <small className=' text-lg'></small>
              <FunFacts isSearching={isSearching} />
            </section> 
          : <section className='mt-16 max-w-[1000px] mx-auto'>
            <ul className='flex flex-col gap-6'>
              {places.map((place: any) => (
                <li key={place.address} className='flex gap-4 bg-white rounded-lg items-center shadow-md'>
                  <a href={place.link} className='w-[600px]'>
                    <img src={place.photo} alt={place.name} className='rounded-lg w-full h-[250px] object-cover' />
                  </a>
                  <div className='w-full flex flex-col text-left gap-2 pr-6'>
                    <div className='flex gap-4 justify-between items-center'>
                      <h2 className='text-2xl font-semibold w-[550px] text-ellipsis whitespace-nowrap overflow-x-hidden'>{place.name}</h2>
                      {
                        place.price_range !== '' &&
                        <span className={`${colorPriceRange(place.price_range.length)} font-semibold`}><DollarIcon priceRangeLength={place.price_range.length} /></span>
                      }
                    </div>
                    <div className='flex flex-col gap-2 ms-4 mt-4 text-gray-600'>
                      <span className='flex gap-2 items-center'>
                        <img src="/icons/star-icon.svg" alt="star icon" className='size-4' />
                        {place.rate}
                      </span>
                      <div className='flex gap-2 items-center'>
                        <img src="/icons/location-icon.svg" alt="location icon" className='size-4' />
                        <span className='w-[450px] text-ellipsis whitespace-nowrap overflow-x-hidden'>{place.address}</span>
                      </div>
                      <span className='flex gap-2 items-center'>
                        <img src="/icons/telephone-icon.svg" alt="telephone icon" className='size-4' />
                        {place.phone}
                      </span>
                      <div className='flex gap-2 items-center'>
                        <img src="/icons/check-icon.svg" alt="check icon" className='size-4' />
                        <span className='w-[450px] text-ellipsis whitespace-nowrap overflow-x-hidden'>{place.features}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        }
    </>
  );
}
