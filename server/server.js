const express = require('express')
const app = express()
const cors = require('cors');
const connect = require('./config/db')
require('dotenv').config()

const userRoute = require('./routes/userRoute')

app.use(cors());
app.use(express.json())
app.use('/api/user',userRoute)


const port = process.env.port || 5000;
connect();

app.listen(port,()=>{
    console.log(`we are running at http://localhost:${port}`)
})
