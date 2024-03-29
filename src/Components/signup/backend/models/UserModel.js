const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const User = new mongoose.Schema({
    fullname:{
        type:String,
    },
    gender:{
        type:String,
    },
    email:{
        type:String,
    },
    phonenumber1:{
        type:Number,
    },
    phonenumber2:{
        type:Number,
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        enum:['Admin','OHSMManager','Employee']
    },
    company:{
        type:String,
    },
    IdNumber:{
        type:Number
    },
    BirthDate:{
        type:Date
    },
    date:{
        type:Date,
        default:Date.now
    },
    reports:[{type : mongoose.Schema.Types.ObjectId, ref: 'Reports'}],

    risks:[{type : mongoose.Schema.Types.ObjectId, ref: 'Risks'}],

    risktasks:[{type : mongoose.Schema.Types.ObjectId, ref: 'RiskTasks'}],
    
    incidenttasks:[{type : mongoose.Schema.Types.ObjectId, ref: 'IncidentTasks'}]
});

User.methods.comparePassword = function(password,callback){
    bcrypt.compare(password,this.password,(error,Matching)=>{
        if(error)
            return callback(error);
        else{
            if(!Matching)
                return callback(null,Matching);
            return callback(null,this);    
        }    
    });
}

module.exports=mongoose.model('Users',User)
