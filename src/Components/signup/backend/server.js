const express = require('express') ;
const app = express();
const mongoose = require('mongoose');
const dotenv =require('dotenv');
const routesurls = require('./routes');
const cors = require('cors');
const cookieParser= require('cookie-parser');
const bodyParser= require('body-parser');

dotenv.config()
mongoose.connect(process.env.DB_ACCESS,{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }) 
    .then(()=> console.log("Connected To DataBase"))
app.use(express.json())
app.use(cors())
app.use(cookieParser());
app.use('/',routesurls)
app.listen(4000, () => {console.log('Express Server listening on port 4000');});
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())