import React from 'react'
import { useState } from 'react'
function getVehicleIMG(vehicle) {
  if (vehicle === 'car') {
    return (
      <img className='w-60 -mt-6 mb-8 ' src='https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png' alt="" />
    )
  }
  else if (vehicle === 'motorCycle') {
    return (
      <img className='w-50 mt-1 mb-6 ' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png' alt="" />
    )
  }
  else if (vehicle === 'auto') {
    return (
      <img className='w-50 mt-1 mb-4 ' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png' alt="" />
    )
  }
}
const ConfirmYouRideComponent = ({ setlookingForDriverPanelUp, SelectedVehicle, fare, pickUp, destination, setconfirmYourRidePanelUp, createRide }) => {


  return (
    <div>
      <h2
        onClick={() => {
          setconfirmYourRidePanelUp(false)
        }}
        className='text-center -mt-2 -mb-3'><i className="ri-arrow-down-wide-line text-4xl font-extralight text-gray-300"></i></h2>
      <h2 className='text-xl font-bold ml-3 mt-2 mb-4 '>Confirm your Ride</h2>
      <div className='flex flex-col w-full  justify-center items-center'>

        {getVehicleIMG(SelectedVehicle)}

        <div className='flex gap-3 justify-start items-center w-full ml-7 -mt-3 mb-9 pb-3 pr-3 border-b-1 border-b-gray-400 '>
          <h2 className='mt-2'><i className="ri-map-pin-2-fill text-xl "></i></h2>
          <div>
            <p className='text-base capitalize font-medium '>{pickUp}</p>
          </div>
        </div>
        <div className='flex gap-3 justify-start  items-center w-full ml-7 -mt-6 mb-9 pb-3 pr-3 border-b-1 border-b-gray-400  '>
          <h2 className='mt-2'><i className="ri-map-pin-add-fill text-xl "></i></h2>
          <div>
            <p className='text-base capitalize font-medium '>{destination}</p>
          </div>
        </div>
        <div className='flex gap-3 justify-start w-full ml-7 -mt-6 mb-9 pb-3 pr-3 '>

          <h2 className='mt-2'><i className="ri-cash-line text-xl "></i></h2>

          <div>
            <p className='font-bold text-xl ml-2 capitalize '>₹{fare[SelectedVehicle]}</p>
            <p className='text-base ml-2 capitalize '>cash cash</p>
          </div>
        </div>

        <button onClick={() => { setlookingForDriverPanelUp(true), createRide() }}
          className='-mt-3 mb-4 font-medium text-base bg-green-500 py-2 px-5 rounded-4xl'>Confirm Ride</button>
      </div>
    </div>
  )
}

export default ConfirmYouRideComponent