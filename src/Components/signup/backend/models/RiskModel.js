const mongoose = require('mongoose');
const Risk = new mongoose.Schema({
    RiskName:{type:String,},

    RiskId:{type:Number},

    SiteAdress:{type:String},

    Company:{type:String},

    RiskType:{type:String, enum:['Safety','Chemical','Biological','Physical','Ergonomic']},

    RiskSeverity:{type:String, enum:['Critical','Major','Minor']},

    RiskDetails:{type:String},

    risktasks:[{type : mongoose.Schema.Types.ObjectId, ref: 'Tasks'}],
    
});

module.exports=mongoose.model('Risks',Risk)