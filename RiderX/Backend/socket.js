
const { Server } = require("socket.io");
const UserModel = require("./Model/UserModel");
const captainModel = require("./Model/Captain.model");

let io;
const socketIdMap = new Map();

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            if (userType === 'user') {
                await UserModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
            else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });

            }
        });

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: "invalid location" })
            }
            
            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    type: 'Point',
                    coordinates: [location.lng, location.ltd]
                }
            });
        })

        socket.on("disconnect", () => {
            for (const [userId, id] of socketIdMap.entries()) {
                if (id === socket.id) {
                    socketIdMap.delete(userId);
                    break;
                }
            }
        });
    });
}

function sendMessageToSocketId(socketId, messageobject) {
    if (io.sockets.sockets.has(socketId)) {
        if (io && socketId) {
            io.to(socketId).emit(messageobject.event, messageobject.data);
        } else {
            console.log("Unable to send message. Either io or socketId is not valid.");
        }
    }
    else {
        console.log("Socket ID is no longer valid : ",socketId);
    }

}

module.exports = { initializeSocket, sendMessageToSocketId };
