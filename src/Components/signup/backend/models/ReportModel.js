const mongoose = require('mongoose');
const Report = new mongoose.Schema({
    ReportTitle:{type:String,},

    ReportId:{type:Number},

    ReportedBy:{type:String},

    EmailRB:{type:String},

    phoneRB1:{type:Number},

    phoneRB2:{type:Number},

    companyName:{type:String},

    IncidentType:{type:String, enum:['Injury','Near Miss','Property Damage','Theft']},

    SiteAdress:{type:String},

    Severity:{type:String , enum:['Critical','Major','Minor']},

    incidenttasks:[{type : mongoose.Schema.Types.ObjectId, ref: 'IncidentTasks'}],

    Report:{type:String,},

    date:{type:Date,}

});

module.exports=mongoose.model('Reports',Report)