// Utils
import { colorPriceRange } from '../utils/utils'

// Icons
import DollarIcon from './icons/dollar-icon'

// Ui
import { World } from './ui/globe'

// Data
import { globeConfig, sampleArcs } from '../data/globe-config'

// Components
import FunFacts from './fun-facts'

// Types
import { type Place } from '../types/types'

export default function PlacesList({ isSearching, imageNumber, places }: { isSearching: boolean, imageNumber: number, places: Place[] }) {
  return (
    <>
      {
        isSearching
          ? <section className='w-full flex flex-col gap-2 items-center sm:px-6 max-sm:h-[500px] justify-center'>
            <div className='w-[720px] h-[580px] mx-auto max-[730px]:w-[520px] max-[730px]:h-[420px] max-sm:hidden z-10'>
              <World data={sampleArcs} globeConfig={globeConfig} />
            </div>
            <span className='text-2xl text-center'>Buscando...</span>
            <small className='text-base text-center'>(Esto puede tardar unos segundos)</small>
            <FunFacts isSearching={isSearching} />
          </section>
          : <section className='mt-16 max-w-[1000px] mx-auto'>
            {
              places.length === 0
                ? <div className='flex flex-col gap-4 items-center'>
                  <img src={`/illustrations/travel-${imageNumber}.svg`} alt='travel car' className='size-[450px]' />
                  <span className='text-2xl text-center'>¡Empieza a buscar lugares!</span>
                </div>
                : <ul className='flex flex-col gap-6'>
                  {places.map((place: any) => (
                    <li key={place?.address} className='flex max-[720px]:flex-col gap-4 bg-white rounded-lg items-center shadow-md max-[720px]:pb-6 overflow-x-hidden'>
                      <a href={place?.link} className='w-[600px] max-[720px]:w-full px-0 mx-0'>
                        <img src={place?.photo} alt={place?.name} className='rounded-t-lg min-[720px]:rounded-lg w-full min-w-[280px] h-[250px] object-cover' />
                      </a>
                      <div className='w-full flex flex-col text-left gap-2 pr-6 max-[720px]:px-4 overflow-x-hidden'>
                        <div className='flex gap-4 justify-between items-center'>
                          <h2 className='text-2xl font-semibold w-[550px] text-ellipsis whitespace-nowrap overflow-x-hidden'>{place?.name}</h2>
                          {
                            place?.price_range !== null &&
                            <span className={`${colorPriceRange(place?.price_range?.length)} font-semibold`}><DollarIcon priceRangeLength={place?.price_range?.length} /></span>
                          }
                        </div>
                        <div className='flex flex-col gap-2 min-[720px]:ms-4 mt-4 text-gray-600'>
                          <span className='flex gap-2 items-center'>
                            <img src="/icons/star-icon.svg" alt="star icon" className='size-4' />
                            {place?.rate}
                          </span>
                          <div className='flex gap-2 items-center'>
                            <img src="/icons/location-icon.svg" alt="location icon" className='size-4' />
                            <span className='w-[450px] text-ellipsis whitespace-nowrap overflow-x-hidden'>{place?.address}</span>
                          </div>
                          <span className='flex gap-2 items-center'>
                            <img src="/icons/telephone-icon.svg" alt="telephone icon" className='size-4' />
                            {place?.phone}
                          </span>
                          <div className='flex gap-2 items-center'>
                            <img src="/icons/check-icon.svg" alt="check icon" className='size-4' />
                            <span className='w-[450px] text-ellipsis whitespace-nowrap overflow-x-hidden'>{place?.features}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
            }
          </section>
      }
    </>
  )
}
