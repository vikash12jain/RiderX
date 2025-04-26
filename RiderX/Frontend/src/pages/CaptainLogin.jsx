import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { captainDataContext } from '../context/CaptainContext'
import logo from '../assets/logo.png';


const CaptainLogin = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const { captainData, setCaptainData } = useContext(captainDataContext)
    const [BackendError, setBackendError] = useState('')
    const navigate = useNavigate()

    async function submitHandler(e) {
        e.preventDefault()
        const CaptainData = {
            email: email,
            password: password
        }
        try {
            const response = await axios.post('http://localhost:4000/captain/login', CaptainData)
            if (response.status === 200) {
                const data = response.data
                setCaptainData(data)
                localStorage.setItem('captain-token', response.data.token)
                navigate('/captain-home')
                setemail('')
                setpassword('')
                return
            }
        } catch (error) {
            if (error.response) {
                setBackendError(error.response.data.message)
            } else {
                console.error("An unexpected error occurred. Please try again.")
            }
        }
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-25 mb-10 mt-2'  src={logo} alt="" />
                <form onSubmit={(e) => { submitHandler(e) }}>
                    <h3 className='font-semibold text-lg mb-2'>What's your email</h3>
                    <input required className='mb-5 bg-[#eeeeee] p-3 w-full text-sm rounded border' value={email} onChange={(e) => {
                        setemail(e.target.value)
                    }} type="email" placeholder='email@captain.com' />
                    <h3 className='font-semibold text-lg mb-2'>Enter Password</h3>
                    <input required className='mb-1 bg-[#eeeeee] p-3 text-sm w-full rounded border' type="password" placeholder='Password' value={password} onChange={(e) => {
                        setpassword(e.target.value)
                    }} />
                    <p className='w-full h-2 text-xs mb-2 mt-1 text-center text-red-700 font-bold'>{BackendError}</p>
                    <div>
                        <button className='bg-black text-white p-2 w-full rounded mt-2'>Login</button>
                    </div>
                    <p className='mt-4 text-center text-sm'>Join a fleet? <Link to={'/Captain/Signup'} className="text-blue-600">Register as a Captain</Link></p>
                </form>
            </div>
            <div>
                <Link to={'/users/Login'} className='bg-[#1288d1] flex justify-center align-middle mb-4 rounded text-white p-2 w-full'>Sign in as User</Link>
            </div>
        </div>
    )
}

export default CaptainLogin
