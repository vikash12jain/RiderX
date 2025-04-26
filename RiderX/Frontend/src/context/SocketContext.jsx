

import React, { createContext, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext(); 

export const useSocket = () => useContext(SocketContext);
 
const SocketProvider = ({ children }) => {
    const socket = useRef(null); 

    useEffect(() => {
        socket.current = io('http://localhost:4000',
        ); 

        socket.current.on('connect', () => {
            console.log('✅ Connected to socket server:', socket.current.id);
        });
 
        socket.current.on('disconnect', () => {
            console.log('❌ Disconnected from socket server');
        });

        return () => { 
            socket.current.disconnect();
        };
    }, []);

    const sendMessage = (eventName, data) => {
        if (socket.current) {
            socket.current.emit(eventName, data);
        }
    };

    const receiveMessage = (eventName, callback) => {
        if (socket.current) {
            socket.current.on(eventName, callback);
        }
    };

    return (
        <SocketContext.Provider value={{ sendMessage, receiveMessage, socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
