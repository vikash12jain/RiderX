import React, { createContext, useState } from 'react'

export  const UserDataContext = createContext();

const UserContext = ({ children }) => {
    const [User, setUser] = useState({
        email: '',
        fullname: {
            firstname: '',
            lastname: ''
        }   
    });
    

    return (
        <UserDataContext.Provider value={{User,setUser}}>
            <div>{children}</div>
        </UserDataContext.Provider>
    )
}

export default UserContext