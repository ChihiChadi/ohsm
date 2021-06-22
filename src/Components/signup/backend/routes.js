const express= require ('express');
const router =express.Router();
const User=require('./models/UserModel');
const Report=require('./models/ReportModel');
const Company=require('./models/CompanyModel');
const Risk=require('./models/RiskModel');
const RiskTask=require('./models/RiskTaskModel');
const IncidentTask=require('./models/IncidentTaskModel');
const Site=require('./models/SiteModel');
const bcrypt =require('bcrypt');
const passport = require('passport');
const passportConfig= require ('./passport');
const Jwt =require('jsonwebtoken');
const nodemailer = require("nodemailer");
const async = require('async');
const axios = require('axios');
const flash = require('connect-flash');



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
        phonenumber1:req.body.phonenumber1,
        phonenumber2:req.body.phonenumber2,
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
            "phonenumber1","phonenumber2","role","company"]);
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
router.post('/AddIncidentReports',passport.authenticate('jwt',{session : false}),async(req,res,next)=>{
    const report = new Report(req.body);
    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "a919800e69052a",
        pass: "4dbda1a8f4404e"
      }
    })

    const OHSM= await User.findOne({company:req.user.company,role:'OHSMManager'});
    

    
    report.save(error=>{
        if(error)
            res.status(500).json({message : {msgBody : "Error", msgError: true}});
        else{
            req.user.reports.push(report);
             transport.sendMail({
              from: req.user.email,
              to: OHSM.email,
              subject: "Incident Report",
              text:"New Incident Report Submitted !! Report Details : "+report})

            req.user.save(error=>{
                if(error)
                    res.status(500).json({message : {msgBody : "Error", msgError: true}});
                else
                    res.status(200).json({message : {msgBody : "Successfully created report", msgError : false}});
            });}})    
          });

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
  report.save(error=>{
      if(error)
          res.status(500).json({message : {msgBody : "Error", msgError: true}});
      else{
          req.user.reports.push(report);
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

  // OHSM: Delete Incident Report
  router.delete('/IncidentReports/delete/:id',passport.authenticate('jwt',{session : false}),(req, res, next) => {
    if (req.user.role==='OHSMManager'){
    Report.findByIdAndRemove(req.params.id, (err, data) => {
      if (err) {
        return next(err);
      } else {
        res.status(200).json({msg: data})
      }
    })}
  });

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
    {Risk.find().where('Company',req.user.company)
    .sort({ name: -1 })
    .then((risks) => {
      res.status(200).send(risks);
    })
    .catch((err) => {
      res.status(500).send({message: err.message || "Error Occured",});
    });   
  }});


//OHSM: Add Risk
router.post('/IdRisks/Add',passport.authenticate('jwt',{session : false}),async(req,res)=>{
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
router.get('/IdRisks/edit/:id',passport.authenticate('jwt',{session : false}),async(req, res,next) => {
  if (req.user.role==='OHSMManager'){
  Risk.findById(req.params.id, (err, data) => {
    if (err) {
      return next(err)
    } else {
      res.json(data)
    }
  })}});
  router.put('/IdRisks/update/:id',passport.authenticate('jwt',{session : false}),async(req,res,next)=>{
    Risk.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, data) => {
      if (err) {
        return next(err);
      } else {
        res.json(data)
        console.log('Risk updated successfully !')
      }
    })
  });

  // OHSM: Delete Risk
  router.delete('/IdRisks/delete/:id',passport.authenticate('jwt',{session : false}),async(req, res, next) => {
    if (req.user.role==='OHSMManager'){
    Risk.findByIdAndRemove(req.params.id, (err, data) => {
      if (err) {
        return next(err);
      } else {
        res.status(200).json({msg: data})
      }
    })}
  });

  //OHSM: Add Risk Task
router.post('/RiskTasks/Add',passport.authenticate('jwt',{session : false}),async(req,res)=>{
  if(req.user.role==='OHSMManager'){
  const task = new RiskTask(req.body);
  task.save(error=>{
      if(error)
          res.status(500).json({message : {msgBody : "Error", msgError: true}});
      else{
          req.user.risktasks.push(task);
          req.user.save(error=>{
              if(error)
                  res.status(500).json({message : {msgBody : "Error", msgError: true}});
              else
                  res.status(200).json({message : {msgBody : "Successfully created report", msgError : false}});
          })}})}});

//OHSM: Risk Tasks
router.get('/IdRisks/:id/Tasks',passport.authenticate('jwt',{session : false}),async(req,res,next)=>{
  if (req.user.role==='OHSMManager'){
    Risk.findById(req.params.id).populate('risktasks').exec((error,document)=>{
      if(error)
          res.status(500).json({message : {msgBody : "Error", msgError: true}});
      else{
          res.status(200).send(document.risktasks);  
      }});}});
  

//OHSM: View Risk Task
router.get('/RiskTasks/:id',passport.authenticate('jwt',{session : false}),async(req,res,next)=>{
  if (req.user.role==='OHSMManager'){
  RiskTask.findById(req.params.id, (err, data) => {
    if (err) {
      return next(err)
    } else {
      res.json(data)
    }
  })}});

  //OHSM: Edit Risk Task
router.get('/RiskTasks/edit/:id',passport.authenticate('jwt',{session : false}),async(req, res,next) => {
  if (req.user.role==='OHSMManager'){
  RiskTask.findById(req.params.id, (err, data) => {
    if (err) {
      return next(err)
    } else {
      res.json(data)
    }
  })}});
  router.put('/RiskTasks/update/:id',passport.authenticate('jwt',{session : false}),async(req,res,next)=>{
    RiskTask.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, data) => {
      if (err) {
        return next(err);
      } else {
        res.json(data)
        console.log('Task updated successfully !')
      }
    })
  });

  // OHSM: Delete Risk Task
  router.delete('/RiskTasks/delete/:id',passport.authenticate('jwt',{session : false}),async(req, res, next) => {
    if (req.user.role==='OHSMManager'){
    RiskTask.findByIdAndRemove(req.params.id, (err, data) => {
      if (err) {
        return next(err);
      } else {
        res.status(200).json({msg: data})
      }
    })}
  });

  //OHSM: Add Incident Task
  router.post('/IncidentReports/:id/Tasks/Add',passport.authenticate('jwt',{session : false}),async(req,res)=>{
    if(req.user.role==='OHSMManager'){
    const report= await Report.findById(req.params.id);
    const task = new IncidentTask(req.body);
    task.save(error=>{
        if(error)
            res.status(500).json({message : {msgBody : "Error", msgError: true}});
        else{
            req.user.incidenttasks.push(task);
            report.incidenttasks.push(task);
            req.user.save(error=>{
                if(error)
                    res.status(500).json({message : {msgBody : "Error", msgError: true}});
                else
                    res.status(200).json({message : {msgBody : "Successfully created report", msgError : false}});
            })}})}});
  
  //OHSM: Incident Tasks
  router.get('/IncidentReports/:id/Tasks',passport.authenticate('jwt',{session : false}),async(req,res,next)=>{
    if (req.user.role==='OHSMManager'){
      Report.findById(req.params.id).populate('incidenttasks').exec((error,document)=>{
        if(error)
            res.status(500).json({message : {msgBody : "Error", msgError: true}});
        else{
            res.status(200).send(document.incidenttasks);  
        }});}});
    
  
  //OHSM: View Incident Task
  router.get('/IncidentTasks/:id',passport.authenticate('jwt',{session : false}),async(req,res,next)=>{
    if (req.user.role==='OHSMManager'){
    IncidentTask.findById(req.params.id, (err, data) => {
      if (err) {
        return next(err)
      } else {
        res.json(data)
      }
    })}});
  
    //OHSM: Edit Incident Task
  router.get('/IncidentTasks/edit/:id',passport.authenticate('jwt',{session : false}),async(req, res,next) => {
    if (req.user.role==='OHSMManager'){
      IncidentTask.findById(req.params.id, (err, data) => {
      if (err) {
        return next(err)
      } else {
        res.json(data)
      }
    })}});
    router.put('/IncidentTasks/update/:id',passport.authenticate('jwt',{session : false}),async(req,res,next)=>{
      IncidentTask.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, data) => {
        if (err) {
          return next(err);
        } else {
          res.json(data)
          console.log('Task updated successfully !')
        }
      })
    });
  
    // OHSM: Delete Risk Task
    router.delete('/IncidentTasks/delete/:id',passport.authenticate('jwt',{session : false}),async(req, res, next) => {
      if (req.user.role==='OHSMManager'){
        IncidentTask.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
          return next(err);
        } else {
          res.status(200).json({msg: data})
        }
      })}
    });  

//OHSMM: Company Sites
router.get('/Sites',passport.authenticate('jwt',{session : false}),async(req,res)=>{
  if (req.user.role==='OHSMManager')
  {Site.find().where('companyN',req.user.company)
  .sort({ name: -1 })
  .then((sites) => {
    res.status(200).send(sites);
  })
  .catch((err) => {
    res.status(500).send({message: err.message || "Error Occured",});
  });   
}}); 

//OHSM: Add Site
router.post('/Sites/Add',passport.authenticate('jwt',{session : false}),(req,res)=>{
  if(req.user.role==='OHSMManager'){
    const site = new Site(req.body);
    site.save( (err, data)=>{
      if (err) {
        return next(err)
      } else {
        res.json(data)
      }
    });}});


   //OHSM: View Site
router.get('/Sites/:id',passport.authenticate('jwt',{session : false}),async(req,res,next)=>{
  if (req.user.role==='OHSMManager'){
  Site.findById(req.params.id, (err, data) => {
    if (err) {
      return next(err)
    } else {
      res.json(data)
    }
  })}});

  //OHSM: Edit Site 
router.get('/Sites/edit/:id',passport.authenticate('jwt',{session : false}),(req, res,next) => {
  if (req.user.role==='OHSMManager'){
  Site.findById(req.params.id, (err, data) => {
    if (err) {
      return next(err)
    } else {
      res.json(data)
    }
  })}});
  router.put('/Sites/update/:id',passport.authenticate('jwt',{session : false}),(req,res,next)=>{
    Site.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, data) => {
      if (err) {
        return next(err);
      } else {
        res.json(data)
        console.log('Site updated successfully !')
      }
    })
  });

    // OHSM: Delete Site
    router.delete('/Sites/delete/:id',passport.authenticate('jwt',{session : false}),(req, res, next) => {
      if (req.user.role==='OHSMManager'){
      Site.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
          return next(err);
        } else {
          res.status(200).json({msg: data})
        }
      })}
    });

  //OHSM : Employees List
  router.get('/Employees',passport.authenticate('jwt',{session : false}),async(req,res)=>{
    if (req.user.role==='OHSMManager')
    {User.find().where('company',req.user.company)
    .sort({ name: -1 })
    .then((employees) => {
      res.status(200).send(employees);
    })
    .catch((err) => {
      res.status(500).send({message: err.message || "Error Occured",});
    });   
  }}); 
    //OHSM: View Employee
  router.get('/Employees/:id',passport.authenticate('jwt',{session : false}),async(req,res,next)=>{
    if (req.user.role==='OHSMManager'){
    User.findById(req.params.id, (err, data) => {
      if (err) {
        return next(err)
      } else {
        res.json(data)
      }
    })}});

//OHSM: Dashboard
router.get('/Dashboard1',passport.authenticate('jwt',{session : false}),function(req,res){
  if (req.user.role==='OHSMManager'){
    const dashboard={};
    const Sites={};
    const Reports={};

  async.parallel([
    function(callback) {
      Report.countDocuments({'companyName':req.user.company},function(err,reports){
            if (err) return callback(err);
            dashboard.nbReports = reports;
            callback();
        });
    },
    function(callback) {
      User.countDocuments({'company':req.user.company},function(err,employees){
         if (err) return callback(err);
         dashboard.nbEmployees = employees;
         callback();
     });
 },
    function(callback) {
      Site.countDocuments({'companyN':req.user.company},function(err,sites){
           if (err) return callback(err);
           dashboard.nbSites = sites;
            callback();
        });
    }

], function(err) { 
    if (err) return next(err); 
     res.send(dashboard)
     });}})

router.get('/Dashboard2',passport.authenticate('jwt',{session : false}),function(req,res){
  if (req.user.role==='OHSMManager'){
    const Sites={};
    async.parallel([
      function(callback) {
        Site.find({'companyN':req.user.company},function(err,sites){
             if (err) return callback(err);
             Sites.siten = sites;
              callback();
          });
         }
], function(err) { 
          if (err) return next(err); 
           res.send(Sites)
           });}})

 router.get('/Dashboard3',passport.authenticate('jwt',{session : false}),function(req,res){
     if (req.user.role==='OHSMManager'){
        const Reports={};
       async.parallel([
        function(callback) {
          Report.find({'companyName':req.user.company},function(err,reports){
               if (err) return callback(err);
               Reports.reportn = reports;
                callback();
            });
           },
        ], function(err) { 
             if (err) return next(err); 
              res.send(Reports)  });}})       


//ohsm : get manager
router.get('/ohsm',passport.authenticate('jwt',{session : false}),async(req,res,next)=>{
    User.findOne({company:req.user.company,role:'OHSMManager'}, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        req.flash('OhsmEmail',result.email);
        res.json(result.email);
      }
  })});

 /* function middleware(){
     
       User.findOne({company:req.user.company,role:'OHSMManager'}, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.json(result.email);
      }
      
        } )
  };*/
    
module.exports=router;