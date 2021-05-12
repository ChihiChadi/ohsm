const mongoose = require('mongoose');
const Report = new mongoose.Schema({
    ReportTitle:{type:String,},

    ReportId:{type:Number},

    ReportedBy:{type:String},

    EmailRB:{type:String},

    phoneRB:{type:Number},

    Company:{type:String},

    SiteAdress:{type:String},

    Severity:{type:String , enum:['Critical','Major','Minor']},

    Report:{type:String,},

    date:{type:Date,}

});

module.exports=mongoose.model('Reports',Report)