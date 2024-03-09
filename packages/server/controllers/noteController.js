const Note = require("../model/Note");

const getAllNotes = async (_, res) => {
  const notes = await Note.find().lean();
  res.status(200).json({ message: "success", data: notes });
};

const createNote = async (req, res) => {
  const { title, body } = req.body;
  const createdNote =  await Note.create({ title, body, user: req.userId });
  res.status(201).json({ message: "success", data: createdNote });
};

const getNoteById = async (req, res) => {
  const noteId = req.params.id;

  const note = await Note.findById(noteId, ["title", "body"]).lean();
  if (!note) return res.status(404).json({ message: "Note not found" });

  res.status(200).json({ message: "success", data: note });
};

const updateNote = (req, res) => {
  const noteId = req.params.id;
  const { title, body } = req.body;
  
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
