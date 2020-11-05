const Place = require('../models/placeSchema')
const catchAsyncerrors = require('../middleware/catchAsyncErrors')

exports.helloJoza = function(req,res){
    res.send('Hello Joza !!!')
}

//create a new place /api/v1/places/new
exports.newPlace = catchAsyncerrors ( async (req,res,next)=>{
    const place = await Place.create(req.body);
    console.log(place)
    res.status(200).json({
        success:true,
        message:'place Created',
        data : place
    })
})

//get all places => /api/v1/places
exports.getPlace = catchAsyncerrors( async (req,res, next)=>{
    const place =await Place.find();
    res.status(200).json({
        success:true,
        results:place.length,
        data:place
    })
})
exports.findPlace = catchAsyncerrors( async(req, res, next)=>{

})

//delete a place /api/v1/places/delete
exports.deletePlace = catchAsyncerrors( async(req, res, next)=>{
    const title =req.params.title;

})