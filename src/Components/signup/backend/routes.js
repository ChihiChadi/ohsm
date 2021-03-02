const express= require ('express');
const router =express.Router();
const signuptemplatecopy=require('./models/signupmodels');
//const signintemplatecopy=require('./models/signinmodels');
const bcrypt =require('bcrypt');
//const jwt = require("jsonwebtoken");
//<const auth = require("./middleware/auth");
 
//Sign Up 
router.post('/SignUp', async(req,res) =>{

    const saltpassword = await bcrypt.genSalt()
    const securepassword = await bcrypt.hash (req.body.password, saltpassword)
    const signedupuser= new signuptemplatecopy({
        fullname:req.body.fullname,
        username:req.body.username,
        email:req.body.email,
        password:securepassword
    })
   /* const existingUser = await signedupuser.findOne({ email: req.body.email });
        if (existingUser)
        return res
        .status(400)
        .json({ msg: "An account with this email already exists." });*/
   signedupuser.save()
   .then(data =>{
       res.json(data)
   })
   .catch(error =>{
    res.json(error)
   })  
})

/*Sign In
router.post('/SignIn',async(req,res) =>{
    try {
   const {email,password}=req.body;
   const User = await user.findOne({ email});
     if (!User) 
     return res
    
     const Match = await bcrypt.compare(password, existingUser.password);
     if (!Match) return res;
     const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET);
     res.json({
        token,
        User: {
        id: User._id,
        username: user.username,
        },
        });
      } catch (err) {
        res;
        }
    });

 // Check if token is valid
router.post("/tokenIsValid", async (req, res) => {
    try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);
    const user = await existingUser.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
    });
    router.get("/", auth, async (req, res) => {
        const user = await existingUser.findById(req.user);
        res.json({
        displayName: existingUser.displayName,
        id: user._id,
        });
        });
        */

module.exports=router;

