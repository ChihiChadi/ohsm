const express = require('express') ;
const app = express();
const mongoose = require('mongoose');
const dotenv =require('dotenv');
const routesurls = require('./routes');
const cors = require('cors');



dotenv.config()

mongoose.connect(process.env.DB_ACCESS,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    
    }) 
    .then(()=> console.log("DataBase Connected"))

app.use(express.json())
app.use(cors())
app.use('/App',routesurls)


/*app.use('/SignIn', (req, res) => {
    res.send({
      token: 'test123'
    });
  });

  app.listen(5000, () => console.log('API is running on http://localhost:5000/SignIn'));*/
app.listen(4000, () => {console.log('App listening on port 4000!');});