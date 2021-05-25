const mongoose = require('mongoose');
const Company = new mongoose.Schema({
    CompanyName:{type:String,},

    CompanyId:{type:Number},

    Email:{type:String},

    PhoneNumber:{type:Number},

    Adress:{type:String},

    Website:{type:String},

    sites:[{type : mongoose.Schema.Types.ObjectId, ref: 'Sites'}],

    employees:[{type : mongoose.Schema.Types.ObjectId, ref: 'Users'}],

    reports:[{type : mongoose.Schema.Types.ObjectId, ref: 'Reports'}]

});

module.exports=mongoose.model('Companies',Company)