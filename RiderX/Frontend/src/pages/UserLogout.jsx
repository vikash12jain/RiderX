import React, { useEffect } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

const UserLogout = () => {

    const navigate = useNavigate()

    useEffect(() => {

        const logout = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token){
                    navigate('/users/login');
                    return;
                }

                const response = await axios.get('http://localhost:4000/users/logout', {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })

                if (response.status === 200) {
                    localStorage.removeItem('token');
                    navigate('/users/login');
                }
                else{
                    console.log(response);
                }

            } catch (error) {
                console.error('logout Failed');
                console.log(error);
            }
        }
logout();
    }, [navigate]);


    return (
        <div>
            UserLogout
        </div>
    )
}

export default UserLogout
