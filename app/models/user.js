/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var UserSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      lowercase: true,
      unique: false,
      required: true,
    },
    lName: {
      type: String,
      lowercase: true,
      unique: false,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    sex: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: 'Male',
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    high_cholestrol: {
      type: Boolean,
      default: false,
    },
    physical_injury: {
      type: Boolean,
      default: false,
    },
    diabetes: {
      type: Boolean,
      default: false,
    },
    hypertension: {
      type: Boolean,
      default: false,
    },
    smoking: {
      type: Boolean,
      default: false,
    },
    p_13: { 
      type: Boolean,
      default: false,
    },
    p_14: {
      type: Boolean,
      default: false,
    },
    p_15: {
      type: Boolean,
      default: false,
    },
    p_16: {
      type: Boolean,
      default: false,
    },
    p_17: {
      type: Boolean,
      default: false,
    },
    p_18: {
      type: Boolean,
      default: false,
    },
    p_19: {
      type: Boolean,
      default: false,
    },
    p_20: {
      type: Boolean,
      default: false,
    },
    p_21: {
      type: Boolean,
      default: false,
    },
    p_22: {
      type: Boolean,
      default: false,
    },
    profilePic: {
      type: String,
      default: 'test'
    },
  },
  {
    timestamps: true,
  }
);

// From where there are p_** it is for assessing the user's geo-risk factors

/** TESTING PROFILE PCITURE UPLOAD */

UserSchema.pre('save', function(next) {
  var user = this;
  var SALT_FACTOR = 5;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(passwordAttempt, cb) {
  bcrypt.compare(passwordAttempt, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    } else {
      cb(null, isMatch);
    }
  });
};

module.exports = mongoose.model('User', UserSchema);
