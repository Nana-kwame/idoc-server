
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var fs  =   require('fs');
var multer   = require('multer');
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
        nationality: request.nationality,
        hosID: request.hosID,
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
            var nationality = req.body.nationality;
            var hosID = req.body.hosID;
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
                    hosID: hosID,
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