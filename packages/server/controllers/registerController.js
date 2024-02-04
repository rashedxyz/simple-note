const User = require("../model/User");
const bcrypt = require("bcrypt");

const registerController = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  const duplicate = await User.findOne({ email }).exec();
  if (duplicate)
    return res.status(409).json({ message: "Email already exists" });

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: encryptedPassword });
    return res.status(201).json({ message: "User created" });
  } catch (err) {
    next(err);
  }
};

module.exports = registerController;
