import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png';

const Start = () => {
  return (
    <div>
        <div className=' h-screen w-full pt-6 flex flex-col justify-between  bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover '>
            <img className='w-30 ml-6' src={logo} alt="" />
            <div className=' bg-white py-4 px-3 flex flex-col justify-center gap-1'>
                <h2 className='font-semibold text-xl pl-1'>Get started with RiderX</h2>
                <Link to={'/users/Login'} className='flex justify-center align-middle bg-black text-white rounded mt-2 py-3 w-full'>Continue</Link>
            </div>

        </div>
    </div>
  )
}

export default Start