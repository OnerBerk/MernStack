const mongoose = require('mongoose')

const connectDb=()=>{
try{
    mongoose.connect(
        process.env.DB_URI,
            {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false
            },
        ()=>console.log('connecter a MongoDb'));
}
catch(e) {
    console.log("erreur lors de la connection a mongodb")
}}

module.exports = connectDb
