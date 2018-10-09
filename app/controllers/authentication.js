
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var authConfig = require('../../config/auth');
          
function generateToken(user) {
    return jwt.sign(user, authConfig.secret,{
        expiresIn:10080
    });
}

function setUserInfo(request) {
    
    return{
        _id: request._id,
        fName:request.fName,
        lName: request.lName,
        email: request.email,
        sex: request.sex,
        DOB: request.DOB,
        height: request.height,
        weight: request.weight,
        diabetes: request.diabetes,
        high_cholestrol: request.high_cholestrol,
        physical_injury: request.physical_injury,
        hypertension: request.hypertension,
        smoking: request.smoking,
        profilePic: request.profilePic
    };
}

exports.login = function(req,res,next){
    
        var userInfo = setUserInfo(req.user);
    
        res.status(200).json({
            token: 'JWT' + generateToken(userInfo),
            user: userInfo
        });
    }

    exports.register = function(req, res,next){
        
            var fName = req.body.fName;
            var lName = req.body.lName;
            var email = req.body.email;
            var password= req.body.password;
            var sex = req.body.sex;
            var DOB = req.body.DOB;
            var height= req.body.height;
            var weight= req.body.weight;
            var diabetes= req.body.diabetes;
            var high_cholestrol= req.body.high_cholestrol;
            var physical_injury= req.body.physical_injury;
            var hypertension= req.body.hypertension;
            var smoking= req.body.smoking;
            var profilePic = req.body.profilePic
           
        
            if(!email){
                return res.status(422).send({error: 'You must enter a valid email address'});
            }
        
            if(!password){
                return res.status(422).send({error: 'You must enter a password'});
            }
        
            User.findOne({email: email}, function(err, existingUser){
        
                if(err){
                    return next(err);
                }
        
                if(existingUser){
                    return res.status(422).send({error:'Email address is already in use'});
                }
        
                var user = new User({
                    email: email,
                    password: password,
                    fName: fName,
                    lName: lName,
                    sex: sex,
                    DOB: DOB,
                    height: height,
                    weight:weight,
                    diabetes:diabetes,
                    high_cholestrol:high_cholestrol,
                    physical_injury: physical_injury,
                    hypertension: hypertension,
                    smoking: smoking,
                    profilePic: profilePic,
                    nationality: nationality
                });
        
                user.save(function(err,user){
        
                    if(err){
                      return next(err);  
                    }
        
                    var userInfo = setUserInfo(user);
        
                    res.status(201).json({
                        token: 'JWT' + generateToken(userInfo),
                        user: userInfo
                    })
                })  
            })
        }