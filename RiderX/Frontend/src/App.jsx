import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserProtectedWrapper from '../ProtectedWrapper/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from '../ProtectedWrapper/CaptainProtectedWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
import NotFound from './pages/NotFound'


function App() {
  return (
    <div>
      <Routes>

        <Route path="*" element={<NotFound />} />

        <Route path='/' element={<Start />} />
        <Route path='/users/Login' element={<UserLogin />} />
        <Route path='/users/Signup' element={<UserSignup />} />
        <Route path='/home' element={<UserProtectedWrapper><Home /></UserProtectedWrapper>} />
        <Route path='/Riding' element={<UserProtectedWrapper><Riding /></UserProtectedWrapper>} />
        <Route path='/users/logout' element={<UserLogout />} />


        <Route path='/Captain/Signup' element={<CaptainSignup />} />
        <Route path='/Captain/Login' element={<CaptainLogin />} />
        <Route path='/captain-home' element={<CaptainProtectedWrapper> <CaptainHome /> </CaptainProtectedWrapper>} />
        <Route path='/Captain-Riding' element={<CaptainProtectedWrapper><CaptainRiding /></CaptainProtectedWrapper>} />
        <Route path='/Captainlogout' element={<CaptainLogout />} />
      </Routes> </div>
  )
}

export default App