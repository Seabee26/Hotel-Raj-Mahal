const login=require('./models/login');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Login', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connection Open");
})
.catch((err)=>{
console.log("Error",err);
})

const l=new login({ name:'Tanya',id:45, password:'tanya@123'});

l.save()
.then((data)=>{
    console.log(data);
})
.catch((err)=>{
    console.log("Error",err);
})