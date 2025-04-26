import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        async function logout() {
            try {
                const response = await axios.get('http://localhost:4000//Captainlogout', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    localStorage.removeItem('captain-token');
                    navigate('/Captain/Login')
                }
            } catch (error) {}
        }
        logout();
    }, [navigate])

    return (
        <div>CaptainLogout</div>
    )
}

export default CaptainLogout
