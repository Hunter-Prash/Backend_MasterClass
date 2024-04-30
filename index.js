
require('dotenv').config()
const mongoose = require('mongoose');
const { Schema } = mongoose;

const express = require('express')
const app = express()
const port = 3000
const productRouter=require('./routes/product');


//db connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Ecom');
  console.log("sucess db connection")

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



const bodyParser=require('body-parser');

// Add body parsing middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use('/api',productRouter.routes);

const loggerMiddleware=(req,res,next)=>{
  console.log(`receieved ${req.method} request to ${req.url}`);
  next();
}

const authMiddleware=(req,res,next)=>{
  if(req.query.password=='123'){
      next();
  }
  else{
      res.sendStatus(401);
  }
}



app.use(loggerMiddleware);


app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.get('/tvshow',(req,res)=>{
    res.send('<h2>Game of Thrones</h2>')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})
