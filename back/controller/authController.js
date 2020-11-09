const User =require('../models/userSchema')
const catchAsyncerrors = require('../middleware/catchAsyncErrors')
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/JwtToken.js')

const options = {
    expires : new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24*60*60*1000),
    httpOnly : true
};

//create a new user => /api/v1/register
exports.registerUser = catchAsyncerrors( async (req,res,next)=>{
    const {name, email, password} = req.body;
    
    const user = await User.create({
        name,
        email,
        password
    })
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
    console.log(token)
})

//login user => /api/v1/login
exports.loginUser = catchAsyncerrors( async(req,res,next)=>{
    const {email, password }=req.body;

    //verifier que l'utilisateur a bien entrer son mail et password
    if(!email || !password){
        return next(new ErrorHandler('please enter email & password', 400))
    }
    //trouver le user dans la base de données
    const user = await User.findOne({email}).select('+password')
    if(!user){
        return next(new ErrorHandler('Invalid Email or Password.',401))
    }
    // verifier que les password correspondent
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Password.'),401)
    }
    //creation du jwt token
    const token = user.getJwtToken();
    res
        .status(200)
        .cookie('token', token, options)
        .json({
            success : true,
            message :'user is connected',
            token
        })

})


//get all users => /api/v1/users
exports.getUser = catchAsyncerrors( async (req,res, next)=>{
    const user =await User.find();
    console.log(user)
    res.status(200).json({
        success:true,
        results : user.length,
        data : user
    })
})