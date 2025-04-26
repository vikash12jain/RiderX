import React, { useContext, useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react';
import { useRef } from 'react'
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchComponent from '../Component/LocationSearchComponent';
import ConfirmYouRideComponent from '../Component/ConfirmYouRideComponent';
import LookingForDriver from '../Component/LookingForDriver';
import ChooseVehicle from '../Component/ChooseVehicle';
import WaitingForDriver from '../Component/WaitingForDriver';
import axios from 'axios';
import SocketProvider, { SocketContext, useSocket } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../Component/MapComponent'
import logo from '../assets/logo.png'

const Home = () => {

  const [pickUp, setPickUp] = useState('')
  const [destination, setDestination] = useState('');
  const [activeField, setActiveField] = useState('');
  const [suggestion, setSuggestion] = useState([]);
  const [ride, setRide] = useState('');
  const [fare, setFare] = useState(
    {
      auto: '---',
      car: '---',
      motorCycle: '---'
    });
  const [SelectedVehicle, setSelectedVehicle] = useState(null);

  const [PanelUp, setPanelUp] = useState(false)
  const [vehiclePanelUp, setVehiclePanelUp] = useState(false)
  const [confirmYourRidePanelUp, setconfirmYourRidePanelUp] = useState(false)
  const [lookingForDriverPanelUp, setlookingForDriverPanelUp] = useState(false)
  const [waitingforDriver, setwaitingforDriver] = useState(false)

  const tripRef = useRef(null)
  const mapRef = useRef(null)
  const panelRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const panelArrowRef = useRef(null)
  const confirmYourRideRef = useRef(null)
  const lookingForDriverPanelUpRef = useRef(null)
  const waitingforDriverRef = useRef(null)
  const navigate = useNavigate();

  const { sendMessage, receiveMessage } = useContext(SocketContext)
  const { User } = useContext(UserDataContext)

  const ifError = useRef(null);
  const barRef = useRef(null);
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);
  useEffect(() => {
    sendMessage('join', { userType: 'user', userId: User._id })
  }, [User]);

  useEffect(() => {
    receiveMessage('ride-confirmed', (ride) => {
      setwaitingforDriver(true);
      setRide(ride);
    });
  }, []);

  useEffect(() => {
    receiveMessage('ride-start', (data) => {
      navigate('/Riding');
    });
  }, []);


  const token = localStorage.getItem('token');

  const submitHandler = (e) => {
    e.preventDefault()
  }
  const getSuggestion = async (query) => {

    if (!query) {
      setSuggestion([]);
      return
    }
    try {
      const response = await axios.get('http://localhost:4000/maps/get-autocomplete-suggestion',
        {
          params: { input: query },
          headers: { Authorization: `Bearer ${token}` }
        })
      if (response.status === 200) {
        setSuggestion(response.data.suggestion || []);
      }
      else {
        const errMsg = response?.data?.error?.message || `Unexpected status: ${response.status}`;
        showError(errMsg);
      }

    } catch (error) {
      showError(error.message);
    }

  }

  const fetchVehicleFare = async (pickUp, destination) => {
    if (!pickUp || !destination) {
      setFare({});
      return
    }
    else {
      try {
        const response = await axios.get('http://localhost:4000/ride/get-fare', {
          params: {
            origin: pickUp,
            destination: destination,
          },
          headers: {
            Authorization: `bearer ${token}`
          }
        })
        if (response.status == 200) {
          setFare(response.data.vehicleFare)
        }
        else {
          const errMsg = response?.data?.error?.message || `Unexpected status: ${response.status}`;
          showError(errMsg);
        }
      } catch (error) {
        showError(error.message);
        throw Error('Internal server error');
      }
    }
  }

  const createRide = async () => {
    try {
      const response = await axios.post('http://localhost:4000/Ride/create-ride', {
        pickup: pickUp,
        destination,
        vehicleType: SelectedVehicle
      }, {
        headers: {
          Authorization: `bearer ${token}`
        }
      })
        console.log(response);
        
      if (response.status != 201) {
        const errMsg = response?.data?.error?.message || `Unexpected status: ${response.status}`;
        showError(errMsg);
      }
    } catch (error) {
      showError(err.message);
    }
  }

  useEffect(() => {

    const delayDebounceFn = setTimeout(() => {

      if (activeField === 'pickup' && pickUp.length >= 3) {
        getSuggestion(pickUp)
      }
      else if (activeField === 'destination' && destination.length >= 3) {
        getSuggestion(destination)
      }
    }, 100);
    return () => clearTimeout(delayDebounceFn)
  }, [pickUp, destination]);

  useGSAP(function () {
    if (PanelUp == true) {
      gsap.to(mapRef.current,{
        height:'0',
        zIndex : '10'
      })
      gsap.to(panelRef.current, {
        height: '62%',
      })
      gsap.to(panelArrowRef.current, {
        zIndex: 10000,
        opacity: 1
      })

    } else {
      gsap.to(mapRef.current,{
        height:'62%',
        zIndex:50000000000
      })
      gsap.to(panelRef.current, {
        height: '0'
      })
      gsap.to(panelArrowRef.current, {
        opacity: '0'
      })
     
    }

  }, [PanelUp])

  useGSAP(function () {
    if (vehiclePanelUp == false) {
      gsap.to(vehiclePanelRef.current, {
        y: '100%'
      })
      gsap.to(tripRef.current, {
        opacity: 1,
      })
      gsap.to(mapRef.current,{
        height:'62%',
        zIndex:'50000000000'
      })
    }
    else {
      gsap.to(vehiclePanelRef.current, {
        y: '0%'
      })
      gsap.to(tripRef.current, {
        opacity: 0,
      })
      gsap.to(mapRef.current,{
        height:'62%',
        zIndex:'0'
      })
    }
  }, [vehiclePanelUp])

  useGSAP(function () {
    if (confirmYourRidePanelUp == false) {
      gsap.to(confirmYourRideRef.current, {
        y: '100%'
      })
    }
    else {
      gsap.to(confirmYourRideRef.current, {
        y: '0%'
      })

    }
  }, [confirmYourRidePanelUp])

  useGSAP(function () {
    if (lookingForDriverPanelUp == true) {
      gsap.to(lookingForDriverPanelUpRef.current, {
        y: '0%'
      })
      gsap.to(confirmYourRideRef.current, {
        opacity: 0
      })
    }
    else {
      gsap.to(lookingForDriverPanelUpRef.current, {
        y: '100%'
      })
      gsap.to(confirmYourRideRef.current, {
        opacity: 1
      })

    }
  }, [lookingForDriverPanelUp])


  useGSAP(function () {
    if (waitingforDriver == true) {
      gsap.to(waitingforDriverRef.current, {
        y: '0%'
      })

    }
    else {
      gsap.to(waitingforDriverRef.current, {
        y: '100%'
      })

    }
  }, [waitingforDriver])

  const showError = (msg) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setMessage(msg);
    setVisible(true);

    if (ifError.current) {
      gsap.fromTo(
        ifError.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      );
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
      );
    }

    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      timeoutRef.current = null;
    }, 5000);
  };
  const handleClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (ifError.current) {
      gsap.to(ifError.current, { opacity: 0, y: -30, duration: 0.4 });
    }

    setTimeout(() => {
      setVisible(false);
    }, 400);
  };



  return (
    <div className='relative h-screen overflow-hidden'>
      
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

      <div className='fixed z-999999 top-1.5 left-1'><img className='w-20 ' src={logo} alt="" /></div>

      <div ref={mapRef} className='relative w-screen h-[62%] z-10'>
        <MapComponent/>
      </div>
      <div ref={tripRef} className='absolute top-0 flex flex-col justify-end w-full  h-screen z-100 '>
        <div className='relative bottom-0 bg-white h-[38%]  w-full p-5   '>
          <h5 ref={panelArrowRef}
            className='absolute top-5 right-5 text-2xl opacity-0'
            onClick={() => { setPanelUp(false) }}>
            <i className="ri-arrow-down-wide-fill"></i>
          </h5>

          <h3 className='text-2xl font-semibold  ml-5'>Find a trip</h3>
          <form onSubmit={e => { submitHandler(e) }}>

            <div className='line absolute h-16 bottom-26  left-9 w-1 bg-gray-700 rounded-lg'></div>
            <input
              className='px-10  w-full py-2  text-base rounded-lg bg-[#eee] mt-5 '
              type="text" value={pickUp}
              onFocus={() => {
                setActiveField('pickup')
                if (pickUp.length >= 3) {
                  getSuggestion(pickUp)
                }
              }}
              onClick={() => { setPanelUp(true) }}
              onChange={e => { setPickUp(e.target.value) }}
              placeholder='Add a pickup location'

            />
            <input
              className='px-10  py-2 w-full text-base rounded-lg bg-[#eee] mt-3 mb-4'
              type="text"
              onClick={() => { setPanelUp(true) }}
              onFocus={() => {
                setActiveField('destination');
                if (destination.length >= 3) {
                  getSuggestion(destination)
                }
              }}
              value={destination}
              onChange={e => { setDestination(e.target.value) }}
              placeholder='Enter your destination' />
          </form>
          <div><button className='w-full bg-black text-white font-medium p-2 rounded-lg mt-2'
            onClick={() => {
              if (pickUp.trim() && destination.trim()) {
                fetchVehicleFare(pickUp, destination)
                setVehiclePanelUp(true)
              }
            }}>Find Ride</button></div>
        </div>
        <div ref={panelRef} className='bg-white h-[0]'>
          <LocationSearchComponent setVehiclePanelUp={setVehiclePanelUp} activeField={activeField} suggestion={suggestion} setPickUp={setPickUp} setDestination={setDestination} />
        </div>

      </div>


      <div ref={vehiclePanelRef} className='fixed z-10000 bg-white bottom-0 h-[53%] w-full py-2 px-4 translate-y-0 '>

        <ChooseVehicle setVehiclePanelUp={setVehiclePanelUp} setSelectedVehicle={setSelectedVehicle} fare={fare} setconfirmYourRidePanelUp={setconfirmYourRidePanelUp} />

      </div>

      {/* confirm Your Ride Panel */}
      <div ref={confirmYourRideRef} className='fixed z-10000 bg-white bottom-0 w-full p-2 translate-y-0 '>
        <ConfirmYouRideComponent setlookingForDriverPanelUp={setlookingForDriverPanelUp}
          fare={fare}
          SelectedVehicle={SelectedVehicle}
          pickUp={pickUp}
          destination={destination}
          setconfirmYourRidePanelUp={setconfirmYourRidePanelUp}
          createRide={createRide}
        />
      </div>

      {/* looking for driver */}
      <div ref={lookingForDriverPanelUpRef} className='fixed z-10000 bg-white bottom-0 w-full p-2 translate-y-0 '>
        <LookingForDriver setlookingForDriverPanelUp={setlookingForDriverPanelUp}
          fare={fare}
          pickUp={pickUp}
          destination={destination}
          SelectedVehicle={SelectedVehicle}
          setwaitingforDriver={setwaitingforDriver}
          lookingForDriverPanelUp={lookingForDriverPanelUp} />
      </div>

      {/* waiting for driver */}

      <div ref={waitingforDriverRef} className='fixed z-10000 bg-white bottom-0 min-h-[80%] w-full p-2 translate-y-0 '>
        <WaitingForDriver
          ride={ride}
        />
      </div>

    </div>
  )
}

export default Home
