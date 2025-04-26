import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { captainDataContext } from '../src/context/CaptainContext';

const CaptainProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('captain-token')
  const [isLoading, setisLoading] = useState(true)
  const { captainData, setCaptainData } = useContext(captainDataContext)

  useEffect(() => {
    if (!token) {
      navigate('/captain/login')
    }
    axios.get('http://localhost:4000/captain/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      if (res.status === 200) {
        setCaptainData(res.data)
        setisLoading(false)
      }
    }).catch(err => {
      console.log(err);
      localStorage.removeItem('captain-token')
      navigate('/captain/Login')
    })
  }, [token, navigate]);

  return (
    <div>{children}</div>
  )
}

export default CaptainProtectedWrapper