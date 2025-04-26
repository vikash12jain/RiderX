import React, { useContext, useEffect, useRef, useState } from 'react'
import RidePopUp from '../Component/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import DriverDetailsPanel from '../Component/DriverDetailsPanel'
import ConfirmRidePopUp from '../Component/ConfirmRidePopUp'
import { captainDataContext } from '../context/CaptainContext'
import { SocketContext } from '../context/SocketContext'
import axios from 'axios'
import MapComponent from '../Component/MapComponent'
import logo from '../assets/logo.png'

const CaptainHome = () => {
  const [DriverDetailPanelUp, setDriverDetailPanelUp] = useState(true)
  const [newRidePanel, setnewRidePanel] = useState(false)
  const [ConfirmRidePanelUp, setConfirmRidePanelUp] = useState(false)
  const [ride, setRide] = useState("")
  const newRideRef = useRef(null)
  const ConfirmRidePanelRef = useRef(null)
  const driverDetailRef = useRef(null)
  const { captainData, setCaptainData } = useContext(captainDataContext)
  const { sendMessage, receiveMessage } = useContext(SocketContext)
  const ifError = useRef(null)
  const barRef = useRef(null)
  const [message, setMessage] = useState("")
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    sendMessage('join', { userType: 'captain', userId: captainData._id })
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          sendMessage("update-location-captain", {
            userId: captainData._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }
    updateLocation()
    const locationInterval = setInterval(() => {
      updateLocation()
    }, 10000)
    return () => clearInterval(locationInterval)
  })

  receiveMessage('new-ride', (data) => {
    setRide(data)
    setnewRidePanel(true)
  })

  useEffect(() => {
    console.log("captain home ---riding ", ride)
  }, [ride])

  async function confirmRide() {
    try {
      const response = await axios.post('http://localhost:4000/ride/confirm-ride',
        { rideId: ride._id, captainData },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem('captain-token')}`
          }
        }
      )
      if (response.status !== 200) {
        const errMsg = response?.data?.error?.message || `Unexpected status: ${response.status}`
        showError(errMsg)
      }
    } catch (error) {
      showError(error.message)
    }
  }

  useGSAP(function () {
    if (DriverDetailPanelUp) {
      gsap.to(driverDetailRef.current, {
        y: '0%'
      })
    } else {
      gsap.to(driverDetailRef.current, {
        y: '100%'
      })
    }
  }, [DriverDetailPanelUp])

  useGSAP(function () {
    if (newRidePanel) {
      gsap.to(newRideRef.current, {
        y: '0%'
      })
    } else {
      gsap.to(newRideRef.current, {
        y: '100%'
      })
    }
  }, [newRidePanel])

  useGSAP(function () {
    if (ConfirmRidePanelUp) {
      gsap.to(ConfirmRidePanelRef.current, {
        y: '0%'
      })
    } else {
      gsap.to(ConfirmRidePanelRef.current, {
        y: '100%'
      })
    }
  }, [ConfirmRidePanelUp])

  const showError = (msg) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setMessage(msg)
    setVisible(true)
    if (ifError.current) {
      gsap.fromTo(
        ifError.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      )
    }
    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        {
          scaleX: 1,
          backgroundColor: "#1e3a8a",
          transformOrigin: "left",
        },
        {
          scaleX: 0,
          backgroundColor: "#93c5fd",
          duration: 5,
          ease: "linear",
        }
      )
    }
    timeoutRef.current = setTimeout(() => {
      setVisible(false)
      timeoutRef.current = null
    }, 5000)
  }

  const handleClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (ifError.current) {
      gsap.to(ifError.current, { opacity: 0, y: -30, duration: 0.4 })
    }
    setTimeout(() => {
      setVisible(false)
    }, 400)
  }

  return (
    <div className='relative h-screen'>
      {visible && (
        <div className="showError flex justify-center items-center">
          <div
            ref={ifError}
            className="w-[95%] rounded-md px-4 flex items-center py-2 h-[6%] opacity-0 absolute z-5000000 top-10 bg-white shadow-lg"
          >
            <p className="text-red-700 font-medium">{message}</p>
            <span onClick={handleClose} className="cursor-pointer">
              <i className="ri-close-circle-fill absolute right-3 bottom-0.5 text-3xl text-red-500"></i>
            </span>
            <div
              ref={barRef}
              className="absolute top-10 line w-[99%] left-0.5 rounded-2xl bg-blue-950 h-1"
            ></div>
          </div>
        </div>
      )}
      <div className='fixed z-9999999 top-2 left-2'><img className='w-20' src={logo} alt="" /></div>
      <div className='relative w-screen h-[68%]'>
        <MapComponent />
      </div>
      <div ref={driverDetailRef} className='fixed bottom-0 z-10 bg-white w-full px-4 py-2'>
        <DriverDetailsPanel captainData={captainData} />
      </div>
      <div ref={newRideRef} className='fixed bottom-0 z-10000000 bg-white w-full px-4 py-2 translate-y-0'>
        <RidePopUp ride={ride} setnewRidePanel={setnewRidePanel} setConfirmRidePanelUp={setConfirmRidePanelUp}
          confirmRide={confirmRide} />
      </div>
      <div ref={ConfirmRidePanelRef} className='fixed bottom-0 z-10000000 bg-white w-full h-screen px-4 py-2'>
        <ConfirmRidePopUp
          setConfirmRidePanelUp={setConfirmRidePanelUp}
          setnewRidePanel={setnewRidePanel}
          setDriverDetailPanelUp={setDriverDetailPanelUp}
          ride={ride}
          showError={showError}
        />
      </div>
    </div>
  )
}

export default CaptainHome
