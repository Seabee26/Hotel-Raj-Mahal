const mongoose=require('mongoose');

const menuSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        lowercase:true,
        required:true,
        enum:['breakfast','meal','snacks']
    }
})
const menu=mongoose.model('menu',menuSchema)
module.exports=menu;