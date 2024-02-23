const verifyRole = (req, res, next) => {
  
  // get path and method from request
  const path = req.path;
  const method = req.method;


  console.log(path, method);

  next();
}

module.exports = verifyRole;