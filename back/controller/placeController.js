const Place = require('../models/placeSchema')

exports.helloJoza = function(req,res){
    res.send('Hello Joza !!!')
}

//get all places => /api/v1/places
exports.getPlace =async (req,res, next)=>{
    const places =await Place.find();
    res.status(200).json({
        success:true,
        results:places.length,
        data:places
    })
}

//create a new job /api/v1/places/new
exports.newPlace = async (req,res,next)=>{
    const place = await Place.create(req.body);
    console.log(place)
    res.status(200).json({
        success:true,
        message:'place Created',
        data : place
    }) 
}