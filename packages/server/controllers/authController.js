const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res, next) => {
  try {
    // get data from request body
    const { email, password } = req.body;

    // if email or password is missing, return 400
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // find user by email
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // compare password
    const isPasswordMatched = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // create access token and refresh token
    const userEmail = foundUser.email;
    const userRole = foundUser.role;

    const accessToken = jwt.sign(
      { email: userEmail, role: userRole },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d"
    });

    // save refresh token to user
    foundUser.refreshToken = refreshToken;
    await foundUser.save();
    // set refresh token to cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000
    });

    // return access token and user role
    res.status(200).json({ email: foundUser.email, role: foundUser.role, accessToken });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleLogin };
