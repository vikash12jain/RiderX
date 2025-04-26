import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { captainDataContext } from '../context/CaptainContext';
import logo from '../assets/logo.png';

function CaptainSignup() {
  const [PasswordStatus, setPasswordStatus] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [vehicleColor, setvehicleColor] = useState("");
  const [numberPlate, setnumberPlate] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState();

  const navigate = useNavigate();
  const { captainData, setCaptainData } = useContext(captainDataContext);

  async function submitHandler(e) {
    e.preventDefault();

    const newcaptain = {
      fullname: {
        firstname: FirstName,
        lastname: LastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        numberPlate: numberPlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    };

    try {
      const response = await axios.post('http://localhost:4000/captain/register', newcaptain);

      if (response.status === 201) {
        setCaptainData(response.data);
        localStorage.setItem('captain-token', response.data.token);
        navigate('/captain-home');

        setFirstName('');
        setLastName('');
        setemail('');
        setpassword('');
        setvehicleColor('');
        setnumberPlate('');
        setVehicleType('');
        setVehicleCapacity('');
        setPasswordStatus('');
      } else {
        console.log(response);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        console.log(error.response.data.error);
      }
    }
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-24 mb-2' src={logo} alt="" />

        <form onSubmit={submitHandler}>
          <h3 className='font-semibold text-lg mb-2 mt-1'>Enter your name</h3>
          <div className='flex gap-4'>
            <input
              type="text"
              placeholder='First name'
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='mb-4 bg-[#eeeeee] pl-4 p-3 w-full text-sm rounded border'
            />
            <input
              type="text"
              placeholder='Last name'
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              className='mb-4 bg-[#eeeeee] p-3 pl-4 w-full text-sm rounded border'
            />
          </div>

          <h3 className='font-semibold text-lg mb-2'>Enter your email</h3>
          <input
            required
            className='mb-2 bg-[#eeeeee] p-3 w-full text-sm rounded border'
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder='email@captain.com'
          />

          <h3 className='font-semibold text-lg mb-2'>Create a Password</h3>
          <input
            required
            className='mb-2 bg-[#eeeeee] p-3 text-sm w-full rounded border'
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />

          <h3 className='font-semibold text-lg mb-2'>Vehicle Details</h3>
          <div className='flex gap-4'>
            <div className='w-full'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Vehicle Color</label>
              <input
                type="text"
                placeholder='Enter vehicle color'
                value={vehicleColor}
                onChange={(e) => setvehicleColor(e.target.value)}
                className='mb-2 bg-[#eeeeee] pl-4 p-3 w-full text-sm rounded border'
              />
            </div>

            <div className='w-full'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Number Plate</label>
              <input
                type="text"
                placeholder='Enter number plate'
                value={numberPlate}
                onChange={(e) => setnumberPlate(e.target.value)}
                className='mb-4 bg-[#eeeeee] p-3 pl-4 w-full text-sm rounded border'
              />
            </div>
          </div>

          <div className='flex gap-4'>
            <div className='w-full'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Vehicle Type</label>
              <select
                className='mb-4 bg-[#eeeeee] p-3 pl-4 w-full text-sm rounded border'
                value={vehicleType}
                onChange={e => {
                  setVehicleType(e.target.value);
                  const type = e.target.value;
                  setVehicleCapacity(
                    type === "motorCycle" ? 1 :
                    type === "auto" ? 3 :
                    type === "car" ? 4 : ""
                  );
                }}
              >
                <option value="">-- Select --</option>
                <option value="motorCycle">Motorcycle</option>
                <option value="auto">Auto</option>
                <option value="car">Car</option>
              </select>
            </div>

            <div className='w-full'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Vehicle Capacity</label>
              <input
                type='number'
                placeholder='Enter vehicle capacity'
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                className='mb-4 bg-[#eeeeee] pl-4 p-3 w-full text-sm rounded border'
              />
            </div>
          </div>

          <p className='w-full h-2 text-xs mb-2 text-center text-red-700 font-bold'>{PasswordStatus}</p>

          <button className='bg-black text-white p-2 w-full rounded mt-0'>Create a captain account</button>
        </form>

        <p className='mt-3 text-center text-sm'>
          Already have an Account? <Link to={'/captain/Login'} className="text-blue-600">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default CaptainSignup;
