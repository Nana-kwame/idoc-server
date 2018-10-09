var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var UserSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      lowercase: true,
      unique: false,
      required: true
    },
    lName: {
      type: String,
      lowercase: true,
      unique: false,
      required: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    sex: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male"
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type:Number,
        required: true
    },
    high_cholestrol: {
        type: Boolean,
        default: false
    },
    physical_injury: {
        type: Boolean,
        default: false
    }, 
    diabetes: {
        type: Boolean,
        default: false
    }, 
    hypertension: {
        type: Boolean,
        default: false
    }, 
    smoking: {
        type: Boolean,
        default:false
    },
    profilePic: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

/**TESTING PROFILE PCITURE UPLOAD */

UserSchema.pre("save", function(next) {
  var user = this;
  var SALT_FACTOR = 5;

  if (!user.isModified("password")) {
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

module.exports = mongoose.model("User", UserSchema);
