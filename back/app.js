const express = require('express');
const app = express();
const dotenv = require('dotenv')

//configuration des variables du fichier config.env
dotenv.config({path:'./config/config.env'})

// on importent les routes
const place = require('./routes/placeRoutes')

//on importe la connection a mongo
const connectDb = require('./config/database')

//set le bodyparser
app.use(express.json())


connectDb();

app.use("/api/v1/",place);

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
app.listen(PORT, ()=>{
    console.log(`server is started, ${PORT} in ${NODE_ENV} mode.`)
})