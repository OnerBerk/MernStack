const mongoose =require('mongoose')

const PlaceSchema = new mongoose.Schema({
    title:String,
    content:String,
    date:{
        type:Date,
        default:Date.now
    }
})

const Place = mongoose.model('Place', PlaceSchema)
module.exports = Place
