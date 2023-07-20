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
    },
    phone:{
        type:Number,
    },  
    createdAt:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user', userSchema)