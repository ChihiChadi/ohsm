const mongoose = require('mongoose');
const RiskTask = new mongoose.Schema({
    TaskTitle:{type:String},

    RiskTitle:{type:String},

    TaskId:{type:Number},

    companyName:{type:String},

    SiteAdress:{type:String},

    TaskType:{
        type:String,
        enum:['Corrective','Preventive','Improvement']},
    
    TaskDetails:{type:String},
    
});

module.exports=mongoose.model('RiskTasks',RiskTask)