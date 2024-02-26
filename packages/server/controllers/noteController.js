const Note = require("../model/Note");

const getAllNotes = (req, res) => {
  res.status(200).json({ message: "GET all notes" });
};

const createNote = (req, res) => {
  console.log(req.body);
  
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
