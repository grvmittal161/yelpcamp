const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const Campground=require('./models/campground')
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
// const db=mongoose.connection;
// db.on("error",console.error.bind(console,"connecto=ion error:"));
// db.once("open",()=>{
//     console.log('Database Connected');
// });
// mongoose.set('strictQuery',true)
const app=express();

connection();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    res.send('hello from yelp camp')
})
app.get('/makecampground',async (req,res)=>{
    
    // const db=mongoose.connection;
   const camp= new Campground({title:'backyard',description:'cheap camping'});
    camp.save().then(() => {
        res.send(camp)
    }).catch((err) => {
        res.send("Something went wrong")
    });
   
})


app.listen(3000,()=>{
    console.log('on port 3000!!')
})