// Types
import { type Location } from "../types/types"

export default function AddressesList({ locationsArray, location, handleSelectAddress }: { locationsArray: Location[], location: string, handleSelectAddress: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
  return (
    <>
      {
        locationsArray.length > 0
          ? <div className='absolute top-11 left-0 right-0 mx-auto flex flex-col divide-y-[1px] divide-gray-300 bg-slate-100 text-black w-full px-4 rounded-lg shadow-lg z-50'>
            <button
              className='py-2 font-medium'
              value={location}
              type='button'
              onClick={handleSelectAddress}
            >
              {location}
            </button>
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
              <p className='text-secondaryText text-pretty'>Recuerda que mientras más cantidad de lugares busques, más tiempo de espera...</p>
            </div>
      }
    </>
  )
}
