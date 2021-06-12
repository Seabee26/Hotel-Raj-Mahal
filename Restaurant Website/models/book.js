const mongoose=require('mongoose');

const bookSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    count:{
        type:Number,
        required:true
    },
    time:{
        type:String
    }
})
const book=mongoose.model('book',bookSchema)
module.exports=book;