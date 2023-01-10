const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const Campground=require('./models/campground')
const connection = () =>  {return mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    maxPoolSize: 10,
    useUnifiedTopology:true
})}
const sd = require("./seeds/index")
// const db=mongoose.connection;
// db.on("error",console.error.bind(console,"connecto=ion error:"));
// db.once("open",()=>{
//     console.log('Database Connected');
// });
// mongoose.set('strictQuery',true)
const app=express();

// connection();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    res.render('home')
})
// app.get('/makecampground',async (req,res)=>{
    
//     // const db=mongoose.connection;
//    const camp= new Campground({title:'backyard',description:'cheap camping'});
//     camp.save().then(() => {
//         res.send(camp)
//     }).catch((err) => {
//         res.send("Something went wrong")
//     });
   
// })
app.get('/campgrounds',async (req,res)=>{
    await connection();
const campgrounds= await Campground.find({});
// res.json(campgrounds)
res.render('campgrounds/index',{campgrounds})
})
app.get('/save/campgrounds',async (req,res)=>{
    sd.seedDB()
//     await connection();
// const campgrounds= await Campground.find({});
// res.render('campgrounds/index',{campgrounds})
})

app.get('/campgrounds/:id',async (req,res)=>{
  await   connection();
  const campground=await  Campground.findById(req.params.id)
    res.render('campgrounds/show',{campground});
})

app.listen(3000,()=>{
    console.log('on port 3000!!')
})
