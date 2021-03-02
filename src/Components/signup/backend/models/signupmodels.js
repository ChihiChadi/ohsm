const mongoose = require('mongoose');

const signuptemplate = new mongoose.Schema({
    fullname:{
        type:String,

    },
    username:{
        type:String,

    },
    email:{
        type:String,

    },
    password:{
        type:String,
    
    },
    date:{
        type:Date,
        default:Date.now
    }

})
module.exports=mongoose.model('Users',signuptemplate)
