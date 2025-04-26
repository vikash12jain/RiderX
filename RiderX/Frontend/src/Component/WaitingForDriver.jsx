import React from 'react'

const WaitingForDriver = ({ ride }) => {

    return (
        <div>
            <h2 className='text-xl m-2 border-b pb-4 border-gray-300 font-semibold'>Meet at the pickup point</h2>
            <div className='flex flex-col w-full  justify-center items-center'>
                <div className='flex justify-between w-full p-3 my-2 mb-6 '>
                    <img className='w-40 -mt-8 mb-8 ' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
                    <div className='text-right'>
                        <h4 className='text-base capitalize '>{ride?.captain?.fullname?.firstname + " " + ride?.captain?.fullname?.lastname}</h4>
                        <h2 className='text-xl font-bold -mt-1'>{ride?.captain?.vehicle?.numberPlate}</h2>
                        <h4 className='text-base -mt-1  capitalize'>{ride?.captain?.vehicle?.color} Toyota swift</h4>

                        <div className="flex justify-center gap-0.5 mt-2">
                            {ride?.otp?.split('').map((digit, index) => (
                                <div
                                    key={index}
                                    className="w-7 h-7 flex items-center justify-center border border-gray-400 rounded-md text-normal font-semibold shadow-sm"
                                >
                                    {digit}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='flex gap-3 justify-start items-center w-full ml-7 -mt-3 mb-9 pb-3 pr-3 border-b-1 border-b-gray-400 '>
                    <h2 className='mt-2'><i className="ri-map-pin-2-fill text-xl "></i></h2>
                    <div>
                        <p className='text-base font-medium capitalize '>{ride?.pickup}</p>
                    </div>
                </div>
                <div className='flex gap-3 justify-start items-center  w-full ml-7 -mt-6 mb-9 pb-3 pr-3 border-b-1 border-b-gray-400  '>
                    <h2 className='mt-2'><i className="ri-map-pin-add-fill text-xl "></i></h2>
                    <div>
                        <p className='text-base font-medium capitalize '>{ride?.destination}</p>
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
        </div>
    )
}

export default WaitingForDriver