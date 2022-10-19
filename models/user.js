const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../helpers");

const userSchema = new Schema({
    email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
   password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    required: true,
  }
}, { versionKey: false, timestamps: true })

userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
}

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
}