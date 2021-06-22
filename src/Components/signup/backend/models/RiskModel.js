const mongoose = require('mongoose');
const Risk = new mongoose.Schema({
    RiskName:{type:String,},

    RiskId:{type:Number},

    SiteAdress:{type:String},

    Company:{type:String},

    RiskType:{type:String, enum:['Safety','Chemical','Biological','Physical','Ergonomic']},

    RiskSeverity:{type:String, enum:['Insignificant','Minor','Moderate','Major','Extreme']},

    RiskProbability:{type:String, enum:['Unlikely','Remote','Occasional','Certain','Frequent']},

    RiskDetails:{type:String},

    risktasks:[{type : mongoose.Schema.Types.ObjectId, ref: 'RiskTasks'}],
    
});

module.exports=mongoose.model('Risks',Risk)