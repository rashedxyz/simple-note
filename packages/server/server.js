require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./config/dbConn");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const credentials = require("./middleware/credentials");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const mongoose = require("mongoose");
const routes = require("./routes");
const User = require("./model/User");

// Connect to the database
connectDB();

// make an admin user if there isn't one
const makeAdminUser = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const encryptedAdminPassword = await bcrypt.hash(adminPassword, 10);
  const user = await User.findOne({ email: adminEmail }).exec();
  if (!user) {
    const user = await User.create({
      name: "Admin",
      email: adminEmail,
      password: encryptedAdminPassword,
      role: {
        id: "1001",
        name: "Admin",
        permissions: [
          "get:notes",
          "post:notes",
          "patch:notes",
          "delete:notes",
          "get:users",
          "post:users",
          "patch:users",
          "delete:users"
        ]
      }
    });
  }
};

makeAdminUser();

// request logging
app.use(morgan("dev"));

// Middleware
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "/public")));

app.get("/api/health", (req, res) => {
  res.send("OK");
});

// Routes
app.use(routes);

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
