const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },  
    createdAt:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user', userSchema)