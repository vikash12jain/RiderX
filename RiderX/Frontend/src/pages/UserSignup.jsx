import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import logo from '../assets/logo.png';



function UserSignup() {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [UserData, setUserData] = useState({});
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [BackendError, setBackendError] = useState("");



    const navigate = useNavigate();
    const { User, setUser } = useContext(UserDataContext);


    async function submitHandler(e) {
        e.preventDefault();
        const newUser = {
            fullname: {
                firstname: FirstName,
                lastname: LastName
            },
            email: email,
            password: password
        }
        try {
            const response = await axios.post(`http://localhost:4000/users/register`, newUser);


            if (response.status === 201) {
                const data = response.data
                localStorage.setItem('token', data.token);
                setUser(data.user);

                navigate('/home');
            }
            else {
                return console.log("Response : ", response.json({ message }));
            }


            setUserData(newUser)
            setFirstName('');
            setLastName('');
            setemail('');
            setpassword('');
        } catch (error) {
            if(error.response){
                setBackendError(error.response.data.message)
            }
            else{
                console.error("An unexpected error occurred. Please try again.");       
            }

        }
    }


    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-14  mb-8 mt-4'  src={logo}  alt="" />


                <form onSubmit={(e) => { submitHandler(e) }} >
                    <h3 className='font-semibold text-lg mb-2 mt-5'  >Enter your name</h3>
                    <div className='flex gap-4'>
                        <input
                            type="text"
                            placeholder='First name'
                            value={FirstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                            className='mb-4 bg-[#eeeeee] pl-4 p-3 w-full text-sm rounded border' />

                        <input
                            type="text"
                            placeholder='Last name'
                            value={LastName}
                            onChange={(e) => {
                                setLastName(e.target.value)
                            }}
                            className='mb-4 bg-[#eeeeee] p-3 pl-4 w-full text-sm rounded border' />
                    </div>

                    <h3 className='font-semibold text-lg mb-2' >Enter your email</h3>
                    <input required className='mb-4 bg-[#eeeeee] p-3 w-full text-sm rounded border ' value={email} onChange={(e) => {
                        setemail(e.target.value);

                    }} type="email" placeholder='email@example.com' />

                    <h3 className='font-semibold text-lg mb-2' >Create a Password</h3>
                    <input required className='mb-4 bg-[#eeeeee] p-3 text-sm w-full rounded border' type="password" placeholder='Password' value={password} onChange={(e) => {
                        setpassword(e.target.value);
                    }} />
                  
                    <p className='w-full h-2 text-xs mb-2 text-center text-red-700 font-bold'> {BackendError} </p>
                    <div><button className='bg-black text-white p-2 w-full rounded mt-2'>Create account</button>
                    </div>
                </form>

                <p className='mt-3 text-center text-sm'>Already have an Account? <Link to={'/users/Login'} className="text-blue-600" >Click here</Link></p>

            </div>

        </div>
    )
}

export default UserSignup