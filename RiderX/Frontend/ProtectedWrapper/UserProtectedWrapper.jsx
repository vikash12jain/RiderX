import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { UserDataContext } from '../src/context/UserContext';


const UserProtectedWrapper = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isLoading, setisLoading] = useState(true)
    const { setUser } = useContext(UserDataContext)

    useEffect(() => {
        if (!token) {
            navigate('/users/login');
        }
        axios.get('http://localhost:4000/users/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.status === 200) {
                setUser(res.data)
                setisLoading(false)
            }

        })
            .catch(err => {
                console.log(err);
                localStorage.removeItem('token')
                navigate('/users/Login')
            })

    }, [token, navigate]); // Dependencies ensure it runs when token changes

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default UserProtectedWrapper