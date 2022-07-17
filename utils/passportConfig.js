const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const user = require('../schemas/user')
const bcrypt = require('bcrypt');


module.exports = async(passport)=>{
    const authUser = (username,password,done)=>{
        const foundUser = user.find({username})
        if(!foundUser) return done(null,false,{message:"No User found"})
        if (!user.verifyPassword(password)) { return done(null, false); }

        try{
            bcrypt.compare(password, user.password, function(error, isMatch) {
                if (error) {
                throw new Error({message:"Error"})
                } else if (!isMatch) {
                    return done(null,false,{message:"Password or username incorrect"})
                } else {
                    return done(null,user)
                }
          })
        } catch(e){
            console.log(e.message)
        }
    }
    passport.use('local',new LocalStrategy({usernameField:'username'},authUser),);
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        user.findById(id, function (err, user) {
          done(err, user);
        });
      });
    

}