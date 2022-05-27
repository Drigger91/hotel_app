const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const Room = require("./roomSchema");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(val) {
        if (val.length < 6 || val.includes("password")) {
          throw new Error("Password does not match expectaions");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.AuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "secretcodethisis");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
UserSchema.statics.findByCredentials = async (email, pass) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(pass, user.password);
  if (!isMatch) {
    throw new Error("Password is incorrect!");
  }

  return user;
};
UserSchema.virtual("rooms", {
  ref: "Room",
  localField: "_id",
  foreignField: "owner",
});
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 7);
  }
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
