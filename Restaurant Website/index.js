let available=5,retval=[];
let admin_name;
const express=require('express');
const ejs=require('ejs');
const app=express();
const login=require('./models/login');
const book=require('./models/book');
const menu=require('./models/menu');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Login', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connection Open");
})
.catch((err)=>{
console.log("ERror",err);
})

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}),express.static('public'));
async function get_menu(){
    retval.push(await menu.find({category:'breakfast'}));
    retval.push(await menu.find({category:'snacks'}));
    retval.push(await menu.find({category:'meal'}));
   
    return retval;
}

app.get('/hey',async(req,res)=>{
let menu=await get_menu();
//console.log(menu)
res.render("temp.ejs",{menu:menu});
})
app.get('/login',(req,res)=>{
    res.render("login.ejs")
})
app.get('/book',(req,res)=>{
    res.render("book.ejs")
})

app.get('/check',async(req,res)=>{
    let data=await book.find({});
    //console.log(data);
    res.render("all_bookings.ejs",{d:data});
})
app.post('/empOnly',async(req,res)=>{
    const data=await login.find({id:parseInt(req.body.id),password:req.body.password});
    //console.log(data);
    if(data.length===0)
    res.redirect("/login");
    else
    { admin_name=data[0].name; res.render('admin.ejs',{name:admin_name,msg:"None"}) }
    
})
app.post('/book/new',async(req,res)=>{
    let t=req.body.time;
    let booking_time=new Date(t.slice(0,4),t.slice(5,7),t.slice(8,10),t.slice(11,13),t.slice(14,16),0,0)
    console.log("book_time",booking_time);
    let p=parseInt(t.slice(11,13))+1;
    let check_limit=new Date(t.slice(0,11)+p+t.slice(13,16));
    console.log("limit",check_limit);

    const x=await book.find({ 'time' : { $gte: booking_time, $lte: check_limit}});
    let tot_count=0;

    for(let i=0;i<x.length;i++)
    tot_count=tot_count+x[i].count
    console.log("total count",tot_count);

    if((tot_count+parseInt(req.body.count))<=available)
    {
        const data=await book.insertMany([{'name':req.body.name,'email':req.body.email,'phone':req.body.phone,'count':req.body.count,'time':booking_time}]);
        res.render("new_booking.ejs",{data:req.body,msg:"S"});
    }
    else if(req.body.count>=available || tot_count>=available)
    res.render("new_booking.ejs",{data:req.body,msg:"AB"});
   // res.send(req.body);
})

app.post('/emp/create-update',async(req,res)=>{
    const data=await login.find({id:req.body.id});
    //console.log(data);
    if(data.length===0)
    {   
        await login.insertMany([req.body]);  
        res.render('admin.ejs',{name:admin_name,msg:"create"});   
    }
    else
    {   
        await login.findOneAndUpdate({id:req.body.id},req.body);  
        res.render('admin.ejs',{name:admin_name,msg:"update"});  
    }
})
app.post('/emp/delete',async(req,res)=>{
    await login.findOneAndDelete({id:req.body.id})
    res.render('admin.ejs',{name:admin_name,msg:"delete"});
 })
 app.post('/menu/create-update',async(req,res)=>{
    const data=await login.find({name:req.body.name});
    //console.log(data);
    if(data.length===0)
    {   
        await menu.insertMany([req.body]);  
        res.render('admin.ejs',{name:admin_name,msg:"m_create"});   
    }
    else
    {   
        await menu.findOneAndUpdate({name:req.body.name},req.body);  
        res.render('admin.ejs',{name:admin_name,msg:"m_update"});  
    }
})
app.post('/menu/delete',async(req,res)=>{
    await menu.findOneAndDelete({name:req.body.name})
    res.render('admin.ejs',{name:admin_name,msg:"m_delete"});
 })
app.listen(3000,()=>{
    console.log("Listening on port 3000");
})
