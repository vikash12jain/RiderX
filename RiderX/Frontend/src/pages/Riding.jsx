import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom';
import MapComponent from '../Component/MapComponent';
const Riding = () => {
  const {sendMessage, receiveMessage } = useContext(SocketContext)
  const [ride, setRide] = useState('');
  const navigate = useNavigate()

  receiveMessage('ongoing-ride',(data)=>{
    setRide(data);
  })

  receiveMessage('ride-ended',(data)=>{
    navigate('/home')
  })


  return (
    <div className='relative h-screen'>
      <div className='relative z-0 w-screen h-2/3'>
        <MapComponent/>
      </div>

      <div className='fixed bottom-0 bg-white w-[100%]'>
        <h2 className='text-xl m-2 mt-4 ml-4 border-b pb-3 border-gray-300 font-semibold'>Meet at the pickup point</h2>
        <div className='flex flex-col w-full  justify-center items-center'>
          <div className='flex justify-between w-full p-3 my-2 '>
            <img className='w-40 -mt-8 mb-8 ' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
            <div className='text-right'>
              <h4 className='text-xs '>{ride?.captain?.fullname?.firstname + " " + ride?.captain?.fullname?.lastname}</h4>
              <h2 className='text-xl font-bold -mt-1'>KA15Ak00-0</h2>
              <h4 className='text-xs -mt-1 '>{ride?.vehicle?.color} Toyota swift</h4>
            </div>
          </div>

          <div className='flex gap-3 justify-start w-full ml-7 -mt-3 mb-9 pb-3 pr-3 border-b-1 border-b-gray-400 '>
            <h2 className='mt-2'><i className="ri-map-pin-2-fill text-xl "></i></h2>
            <div>
              <p className='font-bold capitalize text-xl'>{ride?.pickup}</p>
            </div>
          </div>
          <div className='flex gap-3 justify-start w-full ml-7 -mt-6 mb-9 pb-3 pr-3 border-b-1 border-b-gray-400  '>
            <h2 className='mt-2'><i className="ri-map-pin-add-fill text-xl "></i></h2>
            <div>
              <p className='font-bold text-xl capitalize '>{ride?.destination}</p>
            </div>
          </div>
          <div className='flex gap-3 justify-start w-full ml-7 -mt-6 mb-2 pb-3 pr-3 '>

            <h2 className='mt-2'><i className="ri-cash-line text-xl "></i></h2>

            <div>
              <p className='font-bold text-xl ml-2 capitalize '>₹{ride?.fare}</p>
              <p className='text-base ml-2 capitalize '>cash cash</p>
            </div>
          </div>
        </div>
        <div className='text-center'>
          <button onClick={() => {
            console.log('Looking for payment app GPay , phone pay !!! \n payment done!');
          }}
            className=' mb-8 mt-3  font-medium text-base bg-green-500 py-2 px-5 rounded-4xl'>Pay now</button>
        </div></div>

    </div>
  )
}

export default Riding     