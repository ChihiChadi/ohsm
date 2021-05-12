const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/UserModel');
const JwtStrategy = require('passport-jwt').Strategy; 

const cookieExtractor = req =>{
    let token=null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}

//authorization
passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey:"jwt-code"
},(payload,done)=>{
    User.findById({_id : payload.sub},(error,user)=>{
        if (error)
            return done(error,false) ;
        if (user)
            return done(null,user);
        else 
            return done(null,false);        
    });
}));

//authentication by email and password
passport.use(new LocalStrategy({usernameField: 'email',passwordField: 'password'},
  function(email,password,done){
    User.findOne({email},(err,user)=>{
        if (err) //something wrong with DB
            return done(err);
        if(!user) //User does not exist   
            return done(null,false);
        user.comparePassword(password,done);  // compare passwords  
    })
}));

