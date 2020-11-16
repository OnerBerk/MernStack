const User =require('../models/userSchema')
const catchAsyncerrors = require('../middleware/catchAsyncErrors')
const gravatar = require('gravatar');
const { json } = require('express');
const ObjectID = require("mongoose").Types.ObjectId

const options = {
    expires : new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24*60*60*1000),
    httpOnly : true
};

//create a new user => /api/v1/register
exports.registerUser = catchAsyncerrors( async (req,res,next)=>{
    const {name, email, password} = req.body;
    try {
        let user = await User.findOne({ email })
        if(user){
            return res.status(400).json({errors:[{msg: 'User already exists' }]});
        }
        const avatar = gravatar.url( email,{ s:'200', r:'pg', d:'mm'} )
        
        user = new User({
            name, email, avatar, password
        })
        await user.save();

        const token = user.getJwtToken() //creation du token
        res
        .status(200)
        .cookie('token', token, options)
        .json({
            success : true,
            message:'user is register',
            data : user,
            token
        })
        
    } catch (errors) {
        console.log(errors.msg);
        res.status(500)
        .send('server error')
    }
})

//login user => /api/v1/login
exports.loginUser = catchAsyncerrors( async(req,res,next)=>{
    const {email, password }=req.body;

    //trouver le user dans la base de données
   let user = await User.findOne({email}).select('+password')
    if(!user){
        return res
            .status(400)
            .json({errors:[{ msg: 'No user with this Email'}]})
    }
    // verifier que les password correspondent
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return res
        .status(400)
        .json({ errors:[{ msg: 'Invalid entries'}] })
    }
    //creation du jwt token
    const token = user.getJwtToken();
    res
        .status(200)
        .cookie('token', token, options)
        .json({
            success : true,
            message :'user is connected',
            token,
            user:{
                id: user._id,
                email:user.email,
                name:user.name
            }
        })

})

//Logout user  => /api/v1/logout
exports.logout = catchAsyncerrors(async (req,res,next)=>{
    res.cookie('token','none',{
        expires : new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success:true,
        message: 'Loggout Succesfull'
    })
})


//get the connected users => /api/v1//user
exports.getUserProfile = catchAsyncerrors( async (req,res)=>{
    const user = await User.findById(req.user.id);
    res
    .status(200)
    .json({
        name: user.name,
        password: user.password,
        data: user
    })
    console.log(user)
 
})

//get all users => /api/v1//update
exports.getUserAndUpdate = catchAsyncerrors( async (req,res)=>{
    await User.findByIdAndUpdate(req.user.id,
        {
            name: req.body.name,
            email: req.body.email
        },
    async function(err, data)
        {
            if(err){
                console.log(err)
            }
            else{
                res
                .send(data);
                console.log("user update")
            }
        });
})


//delet user => /api/v1/delete
exports.deleteUser = catchAsyncerrors( async(req,res)=>{
   if (!ObjectID.isValid(req.params.id))
       return res
       .status(400)
       .send('no user with this ID')
    
   await User.findByIdAndRemove(req.params.id, (err, data)=>{
        if(!err)
        res.send(data)
        else console.log('Error while deleting')
    })

   
});




