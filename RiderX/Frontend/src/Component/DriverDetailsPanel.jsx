import React from 'react'

const DriverDetailsPanel = ({ captainData }) => {
   
    
      
    return (
        <div>
            <div className='px-2 py-4 flex items-center justify-between border-b mb-2 border-gray-300'>
                <div className='flex gap-4 items-center '>
                    <img className='h-12 w-12 rounded-full ' src="https://tse4.mm.bing.net/th?id=OIP.eI5UvarY266w7gSIyS8JgwAAAA&pid=Api&P=0&h=180" alt="" />
                    <h2 className='font-semibold text-lg capitalize'>
                        {captainData?.fullname?.firstname} {captainData?.fullname?.lastname}
                    </h2>

                </div>
                <div>
                    <p className='font-semibold text-base'>₹2123.20</p>
                    <p className='text-sm -mt-1'>Earned</p>
                </div>
            </div>
            <div className='flex justify-between w-full px-4 py-2 mt-4 items-center mb-3'>
                <div className='text-center'>
                    <h2>
                        <i className="ri-timer-2-line text-2xl"></i>
                    </h2>
                    <p className='font-medium'>
                        10.2
                    </p>
                    <p className='text-sm font-light'>
                        Hours Online
                    </p>
                </div>
                <div className='text-center'>
                    <h2>
                        <i className="ri-user-location-line  text-2xl"></i>
                    </h2>
                    <p className=' font-medium'>
                        68KM
                    </p>
                    <p className='text-sm font-light'>
                        Distance Travelled
                    </p>
                </div>
                <div className='text-center'>
                    <h2>
                        <i className="ri-shield-star-line text-2xl"></i>
                    </h2>
                    <p className='font-medium'>
                        4.2
                    </p>
                    <p className='text-sm font-light'>
                        Rating Average
                    </p>
                </div>


            </div>
        </div>
    )
}

export default DriverDetailsPanel