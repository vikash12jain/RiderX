import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext';
import logo from '../assets/logo.png';


const UserLogin = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [UserData, setUserData] = useState({});
    const { user, setUser } = useContext(UserDataContext);
    const [BackendError, setBackendError] = useState("");
    const navigate = useNavigate();
    

    async function submitHandler(e) {
        e.preventDefault();

        const userData = {
            email: email,
            password: password
        }
        try {
            const response = await axios.post(`http://localhost:4000/users/login`, userData)

            if (response.status === 200) {
                const data = response.data;
                localStorage.setItem('token', data.token);
                setUser(data);

                navigate('/home');
                setemail('');
                setpassword('');
            }
        }
        catch (error) {
            if(error.response){
                setBackendError(error.response.data.message);
            }
            else{
                console.error("An unexpected error occurred. Please try again.");
            }
        }
    }
    return (

        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-25  mb-8 mt-4'  src={logo}  alt="" />

                <form onSubmit={(e) => { submitHandler(e) }} >

                    <h3 className='font-semibold text-lg mb-2' >What's your email</h3>
                    <input required className='mb-5 bg-[#eeeeee] p-3 w-full text-sm rounded border ' value={email} onChange={(e) => {
                        setemail(e.target.value);

                    }} type="email" placeholder='email@example.com' />

                    <h3 className='font-semibold text-lg mb-2' >Enter Password</h3>
                    <input required className='mb-3 bg-[#eeeeee] p-3 text-sm w-full rounded border' type="password" placeholder='Password' value={password} onChange={(e) => {
                        setpassword(e.target.value);
                    }} />
                     <p className='w-full h-2 text-xs mb-3 text-center  text-red-700 font-bold'>{BackendError} </p>
                    
                    <div><button className='bg-black text-white p-2 w-full rounded '>Login</button>
                    </div> <p className='mt-4 text-center text-sm'>New here? <Link to={'/users/Signup'} className="text-blue-600" >Create an Account</Link></p>
                </form></div>
            <div><Link to={'/Captain/Login'} className='bg-[#f17705] flex justify-center align-middle mb-4 rounded text-white p-2 w-full'>Sign in as Captain</Link ></div>

        </div>
    )
}

export default UserLogin