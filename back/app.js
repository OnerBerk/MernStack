const express = require('express');
const app = express();

const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const swaggerJsDoc = require('swagger-jsdoc') 
const swaggerUi = require('swagger-ui-express')
const swaggerOptions  =require('./config/swagger/swagger')

//configuration de swagger dispo sur http://localhost:8080/api-docs/
const swaggerDoc = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc, { explorer: true }))

//configuration des variables du fichier config.env
dotenv.config({path:'./config/config.env'})

//on importe la connection a mongo
const connectDb = require('./config/database');

//set le bodyparser
app.use(express.json({extend:false }))

//set le cookie parser
app.use(cookieParser())

// permet la communication avec le front
app.use(cors())

//connection a la base de données
connectDb();

// on importent les routes
const place = require('./routes/placeRoutes')
const auth = require('./routes/authRoutes')

app.use("/api/v1/",place);
app.use("/api/v1/", auth)

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const server = app.listen(PORT, ()=>{
    console.log(`server is started, ${PORT} in ${NODE_ENV} mode.`)
})
 //traitement de l'erreur Unhandled promise rejection 
 process.on('unhandledRejection',err => {
     console.log(`error: ${err.message}`);
     console.log('Shutting down the serverdue to handled promise rejection')
     server.close(()=>{
         process.exit(1)
     })
 })
