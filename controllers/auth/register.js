const bcrypt = require('bcryptjs');
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user");

const { RequstError, sendEmail, createVerifyEmail } = require("../../helpers");



const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequstError(409, "Email is use")
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const result = await User.create({ email, password: hashPassword, avatarURL, verificationToken });
  
  const mail = createVerifyEmail(email, verificationToken)

  await sendEmail(mail);

  res.status(201).json({
    email: result.email,
    verificationToken: result.verificationToken,
  })

}

module.exports = register;