const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const ejsMate=require('ejs-mate')
const Campground=require('./models/campground')
const methodOverride=require('method-override')
const connection = () =>  {return mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    maxPoolSize: 10,
    useUnifiedTopology:true
})}
const sd = require("./seeds/index")

const app=express();
app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/campgrounds',async (req,res)=>{
    await connection();
const campgrounds= await Campground.find({});
// res.json(campgrounds)
res.render('campgrounds/index',{campgrounds})
})
app.get('/save/campgrounds',async (req,res)=>{
    sd.seedDB()

})
app.get('/campgrounds/new', async (req,res)=>{
  await  res.render('campgrounds/new');
})

app.post('/campgrounds',async (req,res)=>{
   const campground=new Campground(req.body.campground);
   await campground.save();
   res.redirect(`/campgrounds/${campground._id}`)
})

app.get('/campgrounds/:id',async (req,res)=>{
    connection();
  const campground=await  Campground.findById(req.params.id)
    res.render('campgrounds/show',{campground});
})
app.get('/campgrounds/:id/edit', async(req,res)=>{
    const campground=await  Campground.findById(req.params.id)
    res.render('campgrounds/edit',{campground});  
})
app.put('/campgrounds/:id',async (req,res)=>{
   const {id}=req.params;
  const campground= await Campground.findByIdAndUpdate(id,{...req.body.campground})
res.redirect(`/campgrounds/${campground._id}`)
})
app.delete('/campgrounds/:id',async (req,res)=>{
    const {id}=req.params;
   const campground= await Campground.findByIdAndDelete(id,{...req.body.campground})
 res.redirect('/campgrounds')
})
app.listen(3000,()=>{
    console.log('on port 3000!!')
})
