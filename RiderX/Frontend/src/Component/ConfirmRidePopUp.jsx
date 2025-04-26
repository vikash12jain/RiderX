import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState('');
    const { ride } = props;
    async function submitHandler(e) {
        e.preventDefault()
        try {
            const res = await axios.get('http://localhost:4000/Ride/start-ride', {
                params: {
                    rideId: ride._id,
                    otp,
                    captain: ride.captain
                },
                headers: {
                    Authorization: `bearer ${localStorage.getItem('captain-token')}`
                }
            })
            if (res.status === 200) {
                localStorage.setItem('rideId', ride._id)
                navigate('/Captain-Riding')
            }
            else {
                const errMsg = 'Invalid OTP \n ' + res?.data?.error?.message ||res?.data?.error?.message || `Unexpected status: ${res.status}`;
                props.showError(errMsg);
            }

        } catch (error) {
            props.showError('Invalid OTP \n',error.message );
        }
    }
        return (
            <div>
                <h2 onClick={() => { props.setConfirmRidePanelUp(false) }} className='text-center -mt-2 -mb-4'><i className="ri-arrow-down-wide-line text-4xl font-extralight text-gray-200"></i>  </h2>

                <h2 className='text-xl m-2 pb-4 font-semibold mt-3 mb-6'>Confirm your Ride</h2>
                <div className='flex justify-between items-center mb-12 px-4 py-3 rounded-2xl bg-blue-400 '>
                    <div className=' flex gap-3 justify-start items-center'>
                        <img className='h-12 w-12 rounded-full object-cover' src="https://tse1.mm.bing.net/th?id=OIP.irrwNUlWRwXVio_sQb4SrgHaE8&pid=Api&P=0&h=180" alt="" />
                        <h2 className='text-base font-medium'>{props.ride?.user?.fullname?.firstname + " " + props.ride?.user?.fullname?.lastname}</h2>
                    </div>
                    <h2 className=' font-medium'>{props.ride?.distance} KM</h2>
                </div>
                <div className='flex flex-col w-full  justify-center items-center'>


                    <div className='flex gap-3 justify-start w-full ml-7 -mt-3 mb-9 pb-3 pr-3 border-b-1 border-b-gray-400 '>
                        <h2 className='mt-2'><i className="ri-map-pin-2-fill text-xl "></i></h2>
                        <div>
                            <p className='font-bold capitalize text-xl'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex gap-3 justify-start w-full ml-7 -mt-6 mb-9 pb-3 pr-3 border-b-1 border-b-gray-400  '>
                        <h2 className='mt-2'><i className="ri-map-pin-add-fill text-xl "></i></h2>
                        <div>
                            <p className='font-bold text-xl capitalize '>{props.ride?.destination}</p>
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
                <form onSubmit={submitHandler} className='w-full text-center' >
                    <input type="text" maxLength={6} placeholder='Enter 6 digit OTP' value={otp} onChange={(e) => { setOtp(e.target.value) }} className='text-center w-1/2 text-base bg-gray-300 text-black font-semibold rounded-lg py-2 px-2 ' />



                    <div className='flex flex-col gap-2 mt-8 justify-center mb-4'>

                        <button type='submit'

                            className='text-base font-medium  bg-green-700 px-6 py-2 rounded-4xl'>Confirm</button>
                        <button
                            onClick={() => {
                                props.setConfirmRidePanelUp(false)
                                props.setnewRidePanel(false)
                            }}
                            className='text-base font-medium text-white bg-red-700 px-6 py-2 rounded-4xl'>Cancel</button>

                    </div> </form>
            </div>
        )
    }

    export default ConfirmRidePopUp