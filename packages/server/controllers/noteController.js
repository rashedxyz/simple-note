const Note = require("../model/Note");
const User = require("../model/User");

const getAllNotes = async (req, res) => {
  const notes = await User.findById(req.userId);
  res.status(200).json({ message: "GET all notes", data: notes });
};

const createNote = async (req, res) => {
  
  const {title, body} = req.body;
  await Note.create({ title, body, user: req.userId});
  res.status(201).json({ message: "POST create note" });
};

const getNoteById = (req, res) => {
  console.log(req.email, req.role);
  res.status(200).json({ message: "GET note by id" });
};

const updateNote = (req, res) => {
  console.log(req.email, req.role);
  res.status(200).json({ message: "PUT update note" });
};

const deleteNote = (req, res) => {
  console.log(req.email, req.role);
  res.status(200).json({ message: "DELETE note" });
};

module.exports = {
  getAllNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote
};
