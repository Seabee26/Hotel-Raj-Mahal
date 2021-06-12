const mongoose=require('mongoose');

const loginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    id:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const login=mongoose.model('login',loginSchema)
module.exports=login;