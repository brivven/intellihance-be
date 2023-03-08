
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const dotenv = require('dotenv');
dotenv.config({path:"./.env"});

app.use(cookieParser());
app.use(express.json({ limit: '50mb'}));
app.use(cors({credentials: true, origin: true,}));



const connectDB = async ()=>{
    await mongoose.connect(process.env.MONGODB_URI , {
        useNewUrlParser: true,
    }).then((connected)=>{
        if(connected){
            console.log('connected to mongodb');
        }
    }).catch((error)=>{
        console.log('error with mongodb connection '+error);
    })
}

connectDB();




const ArticlesRoute = require('./Routes/ArticlesRoute');
app.use('/Articles' , ArticlesRoute);




app.listen(process.env.PORT || 3001 , ()=>{
    console.log('server running on port 3001')
});