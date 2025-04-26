import React from 'react'
import { Link } from 'react-router-dom'

const CaptainRidingPopUp = (props) => {
const {ride} = props;
    return (
        <div>
            <div className='flex gap-3 justify-start mt-5 w-full ml-3  mb-3 pb-3 pr-3  '>
                <h2 className='mt-2'><i className="ri-map-pin-add-fill text-xl "></i></h2>
                <div>
                    <p className='font-bold text-xl capitalize '>{ride?.destination}</p>
                </div>
            </div>
            <div className='flex justify-between w-full p-2 items-center'>
                <div className='text-left'>
                    <div className=''><span className='text-sm font-medium'>Total Fair : </span> <span className='text-sm font-medium'>₹{ride?.fare}</span></div>
                    <div className='-mt-2'><span className='text-sm font-medium'>{ride?.distance} km Away </span></div>
                </div>
                <div>
                    <button onClick={()=>{
                        props.setFinishRidePanelUp(true)
                    }} className='bg-green-600 px-6 py-3 rounded-xl  font-medium text-sm text-white'>Complete Ride</button>
                </div>
            </div>
        </div>
    )
}

export default CaptainRidingPopUp