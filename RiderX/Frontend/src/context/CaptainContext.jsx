import React, { createContext, useContext, useState } from 'react'

export const captainDataContext = createContext();
const CaptainContext = ({children}) => {
    const [captainData,setCaptainData] = useState({});

    
  return (
    <captainDataContext.Provider value = {{captainData,setCaptainData}}>
        {children}
    </captainDataContext.Provider>
  )
}

export default CaptainContext