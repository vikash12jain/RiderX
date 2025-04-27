import React from 'react'

const ChooseVehicle = (prop) => {
  return (
    <div>

      <h5 className='absolute top-5 right-5 text-2xl'
        onClick={() => {
          prop.setVehiclePanelUp(false)

        }}><i className="ri-arrow-down-wide-fill"></i></h5>
      <h3 className='text-xl font-semibold mt-4'>Choose a vehicle</h3>
      <div className='mt-4' >

        {/* UBER CAR */}
        <div
          onClick={() => {
            prop.setconfirmYourRidePanelUp(true)
            prop.setSelectedVehicle('car')
          }}
          className=' flex justify-between items-center border border-gray-300 active:border-black active:border  rounded-lg px-2 py-2 w-full mt-2 '>
          <img className='h-15 relative  bottom-2' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />

          <div className=' relative right-2 flex flex-col'>
            <p className='font-medium text-lg'>Cab <span className='font-normal text-sm'><i className="ri-user-3-fill text-xs"></i>3</span></p>
            <p className='relative bottom-1 text-sm font-medium'>2min away</p>
            <p className='relative bottom-2 text-xs font-normal'>Affordable, compact ride</p>

          </div>
          <p className='text-lg font-semibold ml-4'>₹{prop.fare.car}</p>
        </div>

        {/* UBER MOTORCYCLE */}
        <div 
         onClick={() => {
          prop.setconfirmYourRidePanelUp(true)
          prop.setSelectedVehicle('motorCycle')
        }}
        className=' flex justify-between items-center border border-gray-300 active:border-black active:border rounded-lg px-2 py-2 w-full mt-2 '>
          <img className='h-12 mr-5 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />

          <div className=' relative right-2 flex flex-col'>
            <p className='font-semibold text-lg'>Moto <span className='font-normal text-sm'><i className="ri-user-3-fill text-xs"></i>1</span></p>
            <p className='relative bottom-1 text-sm font-semibold'>2min away</p>
            <p className='relative bottom-2 text-xs font-normal'>Affordable, motorcycle ride</p>

          </div>
          <p className='text-lg font-semibold ml-4'>₹{prop.fare.motorCycle}</p>
        </div>
        {/* UBER AUTO */}
        <div 
        onClick={() => {
          prop.setconfirmYourRidePanelUp(true)
          prop.setSelectedVehicle('auto')
        }}
        className=' flex justify-between items-center border border-gray-300 active:border-black active:border-r-2 rounded-lg px-2 py-2 w-full mt-2 '>
          <img className='h-12 mr-5 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />

          <div className=' relative right-2 flex flex-col'>
            <p className='font-semibold text-lg'>Auto <span className='font-normal text-sm'><i className="ri-user-3-fill text-xs"></i>3</span></p>
            <p className='relative bottom-1 text-sm font-semibold'>2min away</p>
            <p className='relative bottom-2 text-xs font-normal'>Affordable, compact ride</p>

          </div>
          <p className='text-lg font-semibold ml-4'>₹{prop.fare.auto}</p>
        </div>

      </div>
    </div>
  )
}

export default ChooseVehicle