const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDB = require('./DataBase/DB');
const userRoute = require('./Routes/User.route.js');
const captainRoute = require('./Routes/Captain.route.js')
const mapsRoute = require('./Routes/maps.routes.js')
const RideRoute = require('./Routes/Ride.route.js')

dotenv.config();

app.use(cors());
app.use(cookieParser())

connectToDB();

app.get('/', (req, res) => {
    res.send('hell00o world');
});
 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoute);
app.use('/captain', captainRoute);
app.use('/maps',mapsRoute);
app.use('/Ride',RideRoute);

module.exports = app;