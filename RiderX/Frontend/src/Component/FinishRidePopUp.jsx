import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const FinishRidePopUp = (props) => {
    const {ride} = props;
    const navigate = useNavigate()
    async function  finishRide(){
        try{
            const res = await axios.get('http://localhost:4000/ride/end-ride',{
                params:{
                    rideId : ride._id
                },
                headers: {
                    Authorization: `bearer ${localStorage.getItem('captain-token')}`
                  }
            })
            if(res.status === 200){
                navigate('/captain-home')
            }
        }catch(err){
            console.error(err.message);
        }
    }
    return (
        <div>
              <h2 onClick={() => { props.setFinishRidePanelUp(false) }} className='text-center -mt-2 -mb-4'><i className="ri-arrow-down-wide-line text-4xl font-extralight text-gray-200"></i>  </h2>

            <h2 className='text-xl m-2 pb-4 font-bold'>Finish This Ride</h2>
            <div className='flex justify-between items-center mb-8 mt-5 px-3 py-3 rounded-2xl bg-blue-400 '>
                <div className=' flex gap-3 justify-start items-center'>
                    <img className='h-12 w-12 rounded-full object-cover' src="https://tse1.mm.bing.net/th?id=OIP.irrwNUlWRwXVio_sQb4SrgHaE8&pid=Api&P=0&h=180" alt="" />
                    <h2 className='text-base font-medium'>{ride?.user?.fullname?.firstname +" "+ride?.user?.fullname?.lastname}</h2>
                </div>
                <h2 className=' font-medium'>{ride.distance}KM</h2>
            </div>
            <div className='flex flex-col w-full  justify-center items-center'>


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
            <div className='text-center flex'>
                <button onClick={()=>{
                    finishRide()
                }} className=' w-full mt-5 bg-green-700 px-6 py-3 rounded-xl font-medium text-base text-white'>Complete Ride</button >
            </div>
        </div>
    )
}

export default FinishRidePopUp