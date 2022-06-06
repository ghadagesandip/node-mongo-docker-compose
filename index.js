const express = require('express');

if(process.env.NODE_ENV ){
    require('dotenv').config({ path:  './.env.local' });
}else{
    require('dotenv').config();
}

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const app = express();
app.use(express.json())

const categoryModel = require('./src/models/category.model')

const port = process.env.PORT;
// mongo db link inside container
//const db_link = 'mongodb://root:sandip@mongo:27017/first_db';

// mongodb link to connect from outside container
const db_link = process.env.MONGO_URL; //'mongodb://root:sandip@localhost:27017/';


(async ()=>{
    await mongoose.connect(db_link);
})()
mongoose.connection.on('connected', function () {  
    console.log('Mongoose default connection open to ' + db_link);
  }); 
  
  // If the connection throws an error
  mongoose.connection.on('error',function (err) {  
    console.log('Mongoose default connection error: ' + err);
  }); 

 console.log('env', process.env.NODE_ENV) 
 console.log('env', process.env.PORT) 
 console.log('env', process.env.MONGO_URL) 


app.get('/', (req, res) =>{
    res.send('working');
})

app.get('/category', async (req, res) =>{
    const newCate = await categoryModel.find({});
    res.send(newCate);
})


app.post('/category', (req, res) =>{
    const {name, description} = req.body;
    const newCate = new categoryModel({name, description})
    newCate.save((err)=>{
        if (err) 
            res.send(err);
        else
            res.send(newCate);
    })
})



app.listen(port, ()=>{
    console.log('server is up and running on port: '+ port)
})
