import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
      <h2 className='text-xl m-2 pb-4 font-semibold'>New Ride Available</h2>
      <div className='flex justify-between items-center mb-8 px-2 py-3 rounded-2xl bg-blue-400 '>
        <div className=' flex gap-3 justify-start items-center'>
          <img className='h-12 w-12 rounded-full object-cover' src="https://tse1.mm.bing.net/th?id=OIP.irrwNUlWRwXVio_sQb4SrgHaE8&pid=Api&P=0&h=180" alt="" />
          <h2 className='text-base font-medium'>{props.ride?.user?.fullname?.firstname +" "+props.ride?.user?.fullname?.lastname }</h2>
        </div>
        <h2 className=' font-medium'>{props.ride?.distance}KM</h2>
      </div>
      <div className='flex flex-col w-full  justify-center items-center'>


        <div className='flex gap-3 justify-start w-full ml-7 -mt-3 mb-9 pb-3 pr-3 border-b-1 border-b-gray-400 '>
          <h2><i className="ri-map-pin-2-fill text-xl "></i></h2>
          <div>
            <p className='text-lg capitalize '>{props.ride?.pickup}</p>
          </div>
        </div>
        <div className='flex gap-3 justify-start  w-full ml-7 -mt-6 mb-9 pb-3 pr-3  border-b-1 border-b-gray-400  '>
          <h2><i className="ri-map-pin-add-fill text-xl "></i></h2>
          <div>
            <p className='text-lg capitalize  '>{props.ride?.destination}</p>
          </div>
        </div>
        <div className='flex gap-3 justify-start w-full ml-7 -mt-6 mb-2 pb-3 pr-3 '>

          <h2 className='mt-2'><i className="ri-cash-line text-xl "></i></h2>

          <div>
            <p className='font-bold text-xl ml-2 capitalize '>₹{props.ride?.fare}</p>
            <p className='text-base ml-2 capitalize '>cash cash</p>
          </div>
        </div>
      </div>
      <div className='flex gap-4 justify-center mb-4'>
        <button
          onClick={() => {
            props.setnewRidePanel(false)
          }}
          className='text-base font-normal text-gray-600 bg-gray-400 px-6 py-1 rounded-2xl'>Ignore</button>
        <button onClick={()=>{
          props.setConfirmRidePanelUp(true)
          props.confirmRide()
        }} className='text-base font-normal  bg-green-700 px-6 py-1 rounded-2xl'>Accept</button>

      </div>
    </div>
  )
}

export default RidePopUp