const Place = require('../models/placeSchema')

exports.helloJoza = function(req,res){
    res.send('Hello Joza !!!')
}

//create a new place /api/v1/places/new
exports.newPlace = async (req,res,next)=>{
    const place = await Place.create(req.body);
    console.log(place)
    res.status(200).json({
        success:true,
        message:'place Created',
        data : place
    })
    
}

//get all places => /api/v1/places
exports.getPlace =async (req,res, next)=>{
    const place =await Place.find();
    res.status(200).json({
        success:true,
        results:place.length,
        data:place
    })
    res.status(500).send({
        message:
        err.message || "Some error occurred while creating the Tutorial."
    });
}
exports.findPlace =async(req, res, next)=>{
    const title =req.query.title;
    var condition = title 
    console.log(title)
    Place.find(condition)
    .then(data=>{
        if(!data)
            res.status(404).send({message:"article n'as pas été trouvé"})
        else res.send(data)
    })
    .catch(err=>{
        res
            .status(500)
            .send({message:"erreur sur la recherche de de l'atricle"+title})
    })
}

//delete a place /api/v1/places/delete
exports.deletePlace =async(req, res, next)=>{
    const title =req.params.title;
    console.log(title)
}