const mongoose = require('mongoose');


const connectToDB = ()=>{
    try{
        mongoose.connect('mongodb://localhost:27017/UBER-Application')
        console.log('Connected to database successfully !!!');
    }
    catch(error){
        console.error(error.message());
    }
}
module.exports = connectToDB;
