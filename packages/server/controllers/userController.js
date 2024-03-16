const bcrypt = require("bcrypt");
const User = require("../model/User");

const getAllUsers = async (req, res) => {
  const userId = req.userId;
  const users = await User.find().lean();
  const filteredUsers = users.filter((user) => user._id.toString() !== userId);
  res.status(200).json({ message: "success", data: filteredUsers });
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!email || !password || !role)
    return res
      .status(400)
      .json({ message: "Email, password and role are required" });

  const duplicate = await User.findOne({ email }).exec();
  if (duplicate)
    return res.status(409).json({ message: "User already exists" });
  const encryptedPassword = await bcrypt.hash(password, 10);
  const createdUser = await User.create({
    name,
    email,
    password: encryptedPassword,
    role
  });

  const responseData = {
    name: createdUser.name,
    email: createdUser.email,
    role: createdUser.role
  };
  return res.status(201).json({ message: "Success", data: responseData });
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId, ["name", "email", "role"]).lean();
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json({ message: "success", data: user });
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, role } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { name, email, role },
    { new: true }
  ).lean();

  const responseData = {
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role
  };

  res.status(200).json({ message: "success", data: responseData });
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) return res.status(404).json({ message: "User not found" });
  res.status(204).end();
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
