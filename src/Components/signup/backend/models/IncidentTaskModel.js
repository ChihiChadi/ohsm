const mongoose = require('mongoose');
const IncidentTask = new mongoose.Schema({
    TaskTitle:{type:String,},

    IncidentTitle:{type:String,},

    TaskId:{type:Number},

    companyName:{type:String},

    SiteAdress:{type:String},

    TaskType:{
        type:String,
        enum:['Corrective','Preventive','Improvement']},
    
    TaskDetails:{type:String},
    
});

module.exports=mongoose.model('IncidentTasks',IncidentTask)