
const mongoose=require('mongoose');
const campground = require('../models/campground');
const Campground=require('../models/campground');
const cities=require('./cities');
const {places,descriptors}=require('./seedHelpers');
const connection = () =>  {return mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    maxPoolSize: 10,
    useUnifiedTopology:true
}, (error, data) => {
    if (error) {
        console.error.bind(console,"connecto=ion error:")
        return null
    }
    console.log('Database Connected');
    return data;
})};
connection();

const sample=(array)=>{
    array[Math.floor(Math.random() * array.length)];
}
const seedDB=async ()=>{
    campground.deleteMany({});
   for(let i=0;i<50;i++){
    const random1000=Math.floor(Math.random()*1000);
    const camp=new Campground({
        location:`${cities[random1000].city},${cities[random1000].state}`,
title:`${sample(descriptors)} ${sample(places)}`
    })
   camp.save();
   }
}
seedDB();