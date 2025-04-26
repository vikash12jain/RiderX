const http = require('http');
const app = require("./app.js");
const port = 4000;

const server = http.createServer(app);
const { initializeSocket } = require('./socket');
initializeSocket(server);
server.listen(port,()=>{
    console.log(`server is running on ${port}`);
});