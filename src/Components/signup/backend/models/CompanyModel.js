const mongoose = require('mongoose');
const Company = new mongoose.Schema({
    CompanyName:{type:String,},

    CompanyId:{type:Number},

    Email:{type:String},

    PhoneNumber:{type:Number},

    Adress:{type:String},

    Employees:[{type : mongoose.Schema.Types.ObjectId, ref: 'Users'}],

    Reports:[{type : mongoose.Schema.Types.ObjectId, ref: 'Reports'}]

});

module.exports=mongoose.model('Company',Company)