const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt)
      return res.status(401).json({ message: "Unauthorized request" });

    const refreshToken = cookies.jwt;

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });

        const foundUser = await User.findOne({ email: decoded.email });
        if (!foundUser)
          return res.status(403).json({ message: "Forbidden request" });

        const accessToken = jwt.sign(
          { userId: foundUser._id, email: foundUser.email, role: foundUser.role },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        
        res
          .status(200)
          .json({ email: foundUser.email, role: foundUser.role, accessToken });
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = { handleRefreshToken };
