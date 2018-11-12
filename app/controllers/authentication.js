/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */

var jwt = require('jsonwebtoken');
var User = require('../models/user');
var authConfig = require('../../config/auth');

function generateToken(user) {
    return jwt.sign(user, authConfig.secret, {
        expiresIn: 10080,
    });
}

function setUserInfo(request) {
    return{
        _id: request._id,
        fName: request.fName,
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
        profilePic: request.profilePic,
        p_13: request.p_13,
        p_14: request.p_14,
        p_15: request.p_15,
        p_16: request.p_16,
        p_17: request.p_17,
        p_18: request.p_18,
        p_19: request.p_19,
        p_20: request.p_20,
        p_21: request.p_21,
        p_22: request.p_22,

    };
}

exports.login = function(req, res, next) {
        var userInfo = setUserInfo(req.user);

        res.status(200).json({
            token: 'JWT' + generateToken(userInfo),
            user: userInfo,
        });
    };

    exports.register = function(req, res, next) {
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
            var profilePic = req.body.profilePic;
            
            // For assessing the patients geo-risk factors
            var p_13 = request.body.p_13;
            var p_14 = request.body.p_14;
            var p_15 = request.body.p_15;
            var p_16 = request.body.p_16;
            var p_17 = request.body.p_17;
            var p_18 = request.body.p_18;
            var p_19 = request.body.p_19;
            var p_20 = request.body.p_20;
            var p_21 = request.body.p_21;
            var p_22 = request.body.p_22;

            if(!email) {
                return res.status(422).send({error: 'You must enter a valid email address'});
            }

            if(!password) {
                return res.status(422).send({error: 'You must enter a password'});
            }

            User.findOne({email: email}, function(err, existingUser) {
                if(err) {
                    return next(err);
                }

                if(existingUser) {
                    return res.status(422).send({error: 'Email address is already in use'});
                }

                var user = new User({
                    email: email,
                    password: password,
                    fName: fName,
                    lName: lName,
                    sex: sex,
                    DOB: DOB,
                    height: height,
                    weight: weight,
                    diabetes: diabetes,
                    high_cholestrol: high_cholestrol,
                    physical_injury: physical_injury,
                    hypertension: hypertension,
                    smoking: smoking,
                    p_13: p_13,
                    p_14: p_14,
                    p_15: p_15,
                    p_16: p_16,
                    p_17: p_17,
                    p_18: p_18,
                    p_19: p_19,
                    p_20: p_20,
                    p_21: p_21,
                    p_22: p_22,
                    profilePic: profilePic,
                    nationality: nationality,
                });

                user.save(function(err, user) {
                    if(err) {
                      return next(err);
                    }

                    var userInfo = setUserInfo(user);

                    res.status(201).json({
                        token: 'JWT' + generateToken(userInfo),
                        user: userInfo,
                    });
                });
            });
        };
