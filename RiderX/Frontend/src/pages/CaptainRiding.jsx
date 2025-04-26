import React, { useContext, useEffect, useRef, useState } from 'react'
import CaptainRidingPopUp from '../Component/CaptainRidingPopUp'
import FinishRidePopUp from '../Component/FinishRidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SocketContext } from '../context/SocketContext'
import axios from 'axios'
import MapComponent from '../Component/MapComponent'

const CaptainRiding = () => {
  const [FinishRidePanelUp, setFinishRidePanelUp] = useState(false)
  const FinishRidePanelRef = useRef(null)
  const { sendMessage, receiveMessage } = useContext(SocketContext)
  const [ride, setRide] = useState("")

  useGSAP(function () {
    if (FinishRidePanelUp) {
      gsap.to(FinishRidePanelRef.current, { y: '0' })
    } else {
      gsap.to(FinishRidePanelRef.current, { y: '100%' })
    }
  }, [FinishRidePanelUp])

  useEffect(() => {
    async function loadOngoingRideData() {
      const res = await axios.get('http://localhost:4000/ride/ongoing-ride', {
        params: {
          rideId: `${localStorage.getItem('rideId')}`
        },
        headers: {
          Authorization: `bearer ${localStorage.getItem('captain-token')}`
        }
      })
    }
    loadOngoingRideData();
  }, [])

  receiveMessage('ongoing-ride', (data) => {
    setRide(data);
  })

  return (
    <div className='relative h-screen'>
      <div className='relative w-screen h-full z-0'>
        <MapComponent />
      </div>
      <div className='fixed -bottom-1 z-10 bg-yellow-500 rounded-t-2xl pb-4 w-screen px-4 py-2 translate-y-0'>
        <CaptainRidingPopUp setFinishRidePanelUp={setFinishRidePanelUp} ride={ride} />
      </div>
      <div ref={FinishRidePanelRef} className='fixed -bottom-1 z-10 bg-white h-[90%] rounded-t-2xl pb-4 w-screen px-4 py-2 translate-y-0'>
        <FinishRidePopUp setFinishRidePanelUp={setFinishRidePanelUp} ride={ride} />
      </div>
    </div>
  )
}

export default CaptainRiding
