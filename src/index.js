const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const {DB_NAME} =  require('./constants.js')
const cookieparser = require('cookie-parser');

dotenv.config({
    path: './.env'
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

const PORT  =  process.env.PORT || 3000;
const server  = http.createServer(app);


const registerUser = require('./routes/registration.routes.js')
const profile = require('./routes/home.routes.js');

app.use('/api/v1/users', registerUser)
app.use('/api/v1/users', profile)



server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}/${DB_NAME}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

connectDB();