import React from 'react'

const LocationSearchComponent = ({ setVehiclePanelUp, activeField, suggestion, setPickUp, setDestination }) => {
  const locations = [
    "Rishabh Fashion Begum Bazar",
    "4B kapoor's Cafe mine market",
    "7C Koorwal Apartment ",
    "B4 x Road Aramghar ",
    "RGI International airport",
  ]
  return (
    <div className='py-2 overflow-y-scroll max-h-full '>

      {suggestion.map((location, index) => {
        return (
          <div key={index} onClick={() => {
            if (activeField === 'pickup') {
              setPickUp(location.description)
            }
            else if (activeField === 'destination') {
              setDestination(location.description)
            }
            // setVehiclePanelUp(true)

          }} className='flex justify-start align-middle gap-5 py-2 px-6 mb-4  w-full'>
            <div> <i className="ri-map-pin-fill text-xl bg-gray-300 p-2 rounded-full "></i></div>
            <div ><h3 className='font-semibold '>{location.description}</h3></div>
          </div>)
      })}


    </div>
  )
}

export default LocationSearchComponent