const User =require('../models/userSchema')
const catchAsyncerrors = require('../middleware/catchAsyncErrors')
const gravatar = require('gravatar')
//const userSchema = require('../models/userSchema');

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

//delet user => /api/v1/delete
exports.deleteUser = catchAsyncerrors( async(req,res)=>{
    console.log(req.user)
    try {
        await User.findByIdAndDelete(req.user);
        res.json("Have a nice life , hope we will see you soon")
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server Error')
    }
    console.log(req.user)
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


//get all users => /api/v1/users
exports.getUser = catchAsyncerrors( async (req,res)=>{
    const user = await User.findById(req.user);
    res
    .json({
        name: user.name,
        id: user._id
    })
    .status(200)
 
})