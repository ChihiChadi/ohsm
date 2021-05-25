const express= require ('express');
const router =express.Router();
const User=require('./models/UserModel');
const Report=require('./models/ReportModel');
const Company=require('./models/CompanyModel');
const Risk=require('./models/RiskModel');
const bcrypt =require('bcrypt');
const passport = require('passport');
const passportConfig= require ('./passport');
const Jwt =require('jsonwebtoken');

const signToken = userID =>{
    return Jwt.sign({
        iss :"jwt-code",
        sub: userID
    },"jwt-code",{expiresIn:"2d"});
}

//Register 
router.post('/Register', async(req,res) =>{
  
    const saltpassword = await bcrypt.genSalt()
    const securepassword = await bcrypt.hash (req.body.password, saltpassword)
    const signedupuser= new User({
        fullname:req.body.fullname,
        gender:req.body.gender,
        email:req.body.email,
        phonenumber:req.body.phonenumber,
        password:securepassword, 
        role:req.body.role,
        company:req.body.company,
        IdNumber:req.body.IdNumber,
        BirthDate:req.body.BirthDate
    });
    User.findOne({"email":req.body.email},(err,user)=>{
        if(err)
             res.status(500).json({message: {msgBody : "Error occured", msgError: true}})
        if(user)
             res.status(400).json({message: {msgBody : "email alreadey exist", msgError: true}})
        signedupuser.save()
          .then(data =>{
           res.json(data)
   })  })
   .catch(error =>{
    res.json(error)
   })
   Company.findOne({"CompanyName":req.body.company},(err,company)=>{
    if(err)
         res.status(500).json({message: {msgBody : "Error occured", msgError: true}})
    if(!company)
         res.status(400).json({message: {msgBody : "Company doesn't exist", msgError: true}})
      company.employees.push(signedupuser)
      .then(data =>{
       res.json(data)
})  })
.catch(error =>{
res.json(error)
})
  });

//LogIn
router.post('/LogIn',passport.authenticate('local',{session:false}),async(req , res) =>{
    if (req.isAuthenticated()){
        const{_id,email,role}=req.user;
        const token=signToken(_id);
        res.cookie('access_token',token,{httpOnly:true,sameSite:true});
        res.status(200).json({isAuthenticated:true,user:{email,role}});
    };});

//Stay Loged in after closing browser
router.get('/Auth',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {email,role} = req.user;
    res.status(200).json({isAuthenticated:true,user:{email,role}});
});

//Profile
router.get("/Profile",passport.authenticate('jwt',{session : false}),async(req,res)=>{
      try {
            const profile = await User.findOne({_id : req.user._id})
              .populate("user",["fullname","BirthDate","gender","email",
            "phonenumber","role","company"]);
            if (!profile) {
              return res.status(400).json({ msg: "there is no profile for this user" });
            }
            res.json(profile);
      }catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
          }
        });
//edit Profile
router.get('/Profile/edit/:id',passport.authenticate('jwt',{session : false}),(req, res,next) => {
    User.findById(req.params.id, (err, data) => {
        if (err) {
          return next(err)} 
        else {
          res.json(data)}
      })
  });
  router.put('/Profile/update/:id',passport.authenticate('jwt',{session : false}),(req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data)
        console.log('Profile updated successfully !')
      }
    })
  });
        
//LogOut      
router.get('/LogOut',passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('access_token');
    res.json({user:{email:"", role:""},success : true});
});

//Employee: Add Incident Report
router.post('/AddIncidentReports',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const report = new Report(req.body);
    const CompanyU= Company.findOne({"CompanyName":req.body.company});
    report.save(error=>{
        if(error)
            res.status(500).json({message : {msgBody : "Error", msgError: true}});
        else{
            req.user.reports.push(report);
            CompanyU.reports.push(report);
            req.user.save(error=>{
                if(error)
                    res.status(500).json({message : {msgBody : "Error", msgError: true}});
                else
                    res.status(200).json({message : {msgBody : "Successfully created report", msgError : false}});
            });}})});

//Employee: My Reports
router.get('/MyReports',passport.authenticate('jwt',{session : false}),async(req,res)=>{
  User.findById({_id : req.user._id}).populate('reports').exec((error,document)=>{
    if(error)
        res.status(500).json({message : {msgBody : "Error", msgError: true}});
    else{
        res.status(200).send(document.reports);  
    }});});

//Employee: view Report
router.get('/MyReports/:id',passport.authenticate('jwt',{session : false}),async(req,res,next)=>{
  Report.findById(req.params.id, (err, data) => {
    if (err) {
      return next(err)
    } else {
      res.json(data)
    }
  })});

//Employee:  get Report To Edit
router.get('/MyReports/edit/:id',passport.authenticate('jwt',{session : false}),(req,res,next)=>{
      Report.findById(req.params.id, (err, data) => {
        if (err) {
          return next(err)
        } else {
          res.json(data)
        }
      })});

//Employee: Edit Report
router.put('/MyReports/update/:id',passport.authenticate('jwt',{session : false}),(req,res,next)=>{
      Report.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, data) => {
        if (err) {
          return next(err);
        } else {
          res.json(data)
          console.log('Report updated successfully !')
        }
      })
    });


//Admin: Users List
router.get('/Users',passport.authenticate('jwt',{session : false}),async(req,res)=>{
    if (req.user.role==='Admin'){
    User.find().sort({ name: -1 }).then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error Occured",
      });
    });   
}});

//Admin: get User to Edit
router.get('/Users/edit/:id',passport.authenticate('jwt',{session : false}),(req,res,next)=>{
  if (req.user.role==='Admin'){
    User.findById(req.params.id, (err, data) => {
      if (err) {
        return next(err)
      } else {
        res.json(data)
      }
    })}});

 //Admin:Edit User
 router.put('/Users/update/:id',passport.authenticate('jwt',{session : false}),(req,res,next)=>{
  if (req.user.role==='Admin'){
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, data) => {
      if (err) {
        return next(err);
      } else {
        res.json(data)
        console.log('User updated successfully !')
      }
    })}
  });

  //Admin: Delete User
router.delete('/Users/delete/:id',passport.authenticate('jwt',{session : false}),(req, res, next) => {
  if (req.user.role==='Admin'){
  User.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      return next(err);
    } else {
      res.status(200).json({msg: data})
    }
  })}
});

//Admin: View User
router.get('/Users/:id',passport.authenticate('jwt',{session : false}),(req,res,next)=>{
  if (req.user.role==='Admin'){
    User.findById(req.params.id, (err, data) => {
      if (err) {
        return next(err)
      } else {
        res.json(data)
      }
    })}});

//Admin : Companys List
router.get('/Companys',passport.authenticate('jwt',{session : false}),async(req,res)=>{
  if (req.user.role==='Admin'){
  Company.find().sort({ name: -1 }).then((companys) => {
    res.status(200).send(companys);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Error Occured",
    });
  });   
}});

//Admin: View Company
router.get('/Companys/:id',passport.authenticate('jwt',{session : false}),(req,res,next)=>{
  if (req.user.role==='Admin'){
    Company.findById(req.params.id, (err, data) => {
      if (err) {
        return next(err)
      } else {
        res.json(data)
      }
    })}});

//Admin: Add Company
router.post('/Companys/Add',passport.authenticate('jwt',{session : false}),async(req,res,next)=>{
  if (req.user.role==='Admin'){
    const company = new Company(req.body);
            company.save( (err, data)=>{
              if (err) {
                return next(err)
              } else {
                res.json(data)
              }
            });}});

  //Admin: get Company to Edit
router.get('/Companys/edit/:id',passport.authenticate('jwt',{session : false}),(req,res,next)=>{
  if (req.user.role==='Admin'){
    Company.findById(req.params.id, (err, data) => {
      if (err) {
        return next(err)
      } else {
        res.json(data)
      }
    })}});

 //Admin:Edit Company
 router.put('/Companys/update/:id',passport.authenticate('jwt',{session : false}),(req,res,next)=>{
  if (req.user.role==='Admin'){
    Company.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, data) => {
      if (err) {
        return next(err);
      } else {
        res.json(data)
        console.log('User updated successfully !')
      }
    })}
  });    

//Admin: Delete Company
    router.delete('/Companys/delete/:id',passport.authenticate('jwt',{session : false}),(req, res, next) => {
      if (req.user.role==='Admin'){
      Company.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
          return next(err);
        } else {
          res.status(200).json({msg: data})
        }
      })}
    });    

//OHSMM: Company Reports
router.get('/IncidentReports',passport.authenticate('jwt',{session : false}),async(req,res)=>{
  if (req.user.role==='OHSMManager')
  {Report.find().where('companyName',req.user.company)
  .sort({ name: -1 })
  .then((reports) => {
    res.status(200).send(reports);
  })
  .catch((err) => {
    res.status(500).send({message: err.message || "Error Occured",});
  });   
}});

//OHSM: View Report
router.get('/IncidentReports/:id',passport.authenticate('jwt',{session : false}),async(req,res,next)=>{
  if (req.user.role==='OHSMManager'){
  Report.findById(req.params.id, (err, data) => {
    if (err) {
      return next(err)
    } else {
      res.json(data)
    }
  })}});

//OHSM: Add Report:

router.post('/IncidentReports/Add',passport.authenticate('jwt',{session : false}),(req,res)=>{
  if(req.user.role==='OHSMManager'){
  const report = new Report(req.body);
  const CompanyU= Company.findOne({"CompanyName":req.body.companyName});
  report.save(error=>{
      if(error)
          res.status(500).json({message : {msgBody : "Error", msgError: true}});
      else{
          req.user.reports.push(report);
          CompanyU.reports.push(report);
          req.user.save(error=>{
              if(error)
                  res.status(500).json({message : {msgBody : "Error", msgError: true}});
              else
                  res.status(200).json({message : {msgBody : "Successfully created report", msgError : false}});
          });}})}});


//OHSM:  get Report To Edit
router.get('/IncidentReports/edit/:id',passport.authenticate('jwt',{session : false}),(req,res,next)=>{
  if (req.user.role==='OHSMManager') {
   Report.findById(req.params.id, (err, data) => {
        if (err) {
          return next(err)
        } else {
          res.json(data)
        }
      })}});

//OHSM: Edit Report
router.put('/IncidentReports/update/:id',passport.authenticate('jwt',{session : false}),(req,res,next)=>{
  if (req.user.role==='OHSMManager') {  
    Report.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, data) => {
        if (err) {
          return next(err);
        } else {
          res.json(data)
          console.log('Report updated successfully !')
        }
      })
  }});

//OHSM: Company Info 
router.get('/CompanySettings',passport.authenticate('jwt',{session : false}),async(req,res,next)=>{
  if (req.user.role==='OHSMManager'){
    Company.findOne({"CompanyName":req.user.company}, (err, data) => {
      if (err) {
        return next(err)
      } else {
        res.json(data)
      }})}});
      

//OHSM: Company Info to Edit
router.get('/CompanySettings/edit/:id',passport.authenticate('jwt',{session : false}),(req,res,next)=>{
  if (req.user.role==='OHSMManager'){
    Company.findById(req.params.id, (err, data) => {
      if (err) {
        return next(err)
      } else {
        res.json(data)
      }
    })}});

 //Admin:Edit Company Info
 router.put('/CompanySettings/update/:id',passport.authenticate('jwt',{session : false}),(req,res,next)=>{
  if (req.user.role==='OHSMManager'){
    Company.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, data) => {
      if (err) {
        return next(err);
      } else {
        res.json(data)
        console.log('Company updated successfully !')
      }
    })}
  });   
  
  //OHSMM: Company Risks
router.get('/IdRisks',passport.authenticate('jwt',{session : false}),async(req,res)=>{
  if (req.user.role==='OHSMManager')
  User.findById({_id : req.user._id}).populate('risks').exec((error,document)=>{
    if(error)
        res.status(500).json({message : {msgBody : "Error", msgError: true}});
    else{
        res.status(200).send(document.risks);  
    }});});  


//OHSM: Add Risk
router.post('/IdRisks/Add',passport.authenticate('jwt',{session : false}),(req,res)=>{
  if(req.user.role==='OHSMManager'){
  const risk = new Risk(req.body);
  risk.save(error=>{
      if(error)
          res.status(500).json({message : {msgBody : "Error", msgError: true}});
      else{
          req.user.risks.push(risk);
          req.user.save(error=>{
              if(error)
                  res.status(500).json({message : {msgBody : "Error", msgError: true}});
              else
                  res.status(200).json({message : {msgBody : "Successfully created report", msgError : false}});
          })}})}});


   //OHSM: View Risk
router.get('/IdRisks/:id',passport.authenticate('jwt',{session : false}),async(req,res,next)=>{
  if (req.user.role==='OHSMManager'){
  Risk.findById(req.params.id, (err, data) => {
    if (err) {
      return next(err)
    } else {
      res.json(data)
    }
  })}});

  //OHSM: Edit Risk 
router.get('/IdRisks/edit/:id',passport.authenticate('jwt',{session : false}),(req, res,next) => {
  if (req.user.role==='OHSMManager'){
  Risk.findById(req.params.id, (err, data) => {
    if (err) {
      return next(err)
    } else {
      res.json(data)
    }
  })}});
  router.put('/IdRisks/update/:id',passport.authenticate('jwt',{session : false}),(req,res,next)=>{
    Risk.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, data) => {
      if (err) {
        return next(err);
      } else {
        res.json(data)
        console.log('Risk updated successfully !')
      }
    })
  });

    
module.exports=router;