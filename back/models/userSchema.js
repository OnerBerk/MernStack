const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true, 'Please enter your name']
    },
    email:{
        type:String,
        required : [true,'please enter an email address'],
        unique : true,
        validate : [validator.isEmail, 'Please enter a valide email address']
    },
    password:{
        type:String,
        required : [true, 'Please enter a Password'],
        minlength : [8, 'Your password must be at least 8 characters long'],
        select : false
    },
    createdAt:{
        type : Date,
        default : Date.now
    },
    resetPasswordToken : String,
    resetPasswordexpire : Date
});

//encryptage du mot de passe en utilisant bcryptjs 
UserSchema.pre('save', async function(next){
    this.password =await bcrypt.hash(this.password,10)
});

//retourne le jwt token
UserSchema.methods.getJwtToken =function(){
    return jwt.sign({ id : this._id},process.env.JWT_SECRET,{
        expiresIn :'1h'
    });
}
//comparer le mots de passe entrer avec la base de donnée 
UserSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password);
}

module.exports = mongoose.model('User',UserSchema)