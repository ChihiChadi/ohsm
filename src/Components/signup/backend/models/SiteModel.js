const { Double } = require('bson');
const mongoose = require('mongoose');
const Site = new mongoose.Schema({
    SiteName:{type:String,},

    SiteId:{type:Number},

    companyN:{type:String},

    SiteAdress:{type:String},

    SiteType:{
        type:String,
        enum:['Construction','Storage','Branch','Headquarters']
    },

    Responsable:{type:String},

    lat:{type:Number},

    lng:{type:Number}
    
});

module.exports=mongoose.model('Sites',Site)