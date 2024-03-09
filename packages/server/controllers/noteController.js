const Note = require("../model/Note");

const getAllNotes = async (_, res) => {
  const notes = await Note.find().lean();
  res.status(200).json({ message: "success", data: notes });
};

const createNote = async (req, res) => {
  const { title, body } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });
  const createdNote = await Note.create({ title, body, user: req.userId });
  res.status(201).json({ message: "success", data: createdNote });
};

const getNoteById = async (req, res) => {
  const noteId = req.params.id;
  const note = await Note.findById(noteId, ["title", "body"]).lean();
  if (!note) return res.status(404).json({ message: "Note not found" });

  res.status(200).json({ message: "success", data: note });
};

const updateNote = async (req, res) => {
  const noteId = req.params.id;
  const { title, body } = req.body;

  if (!title) return res.status(400).json({ message: "Title is required" });

  const updatedNote = await Note.findByIdAndUpdate(
    noteId,
    { title, body },
    { new: true }
  ).lean();

  res.status(200).json({ message: "success", data: updatedNote });
};

const deleteNote = async (req, res) => {
  const noteId = req.params.id;
  const deletedNote = await Note.findByIdAndDelete(noteId);
  if (!deletedNote) return res.status(404).json({ message: "Note not found" });
  res.status(204).end();
};

module.exports = {
  getAllNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote
};
