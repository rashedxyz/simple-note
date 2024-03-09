const verifyMongooseId = (req, res, next) => {
  const docId = req.params.id;

  // check if the docId is mongoose object id or not
  if (!docId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid note id" });
  }

  next();
}

module.exports = verifyMongooseId;