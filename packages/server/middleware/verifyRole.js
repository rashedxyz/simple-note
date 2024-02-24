const verifyRole = (req, res, next) => {
  
  // get path and method from request
  const path = req.path;
  const method = req.method;

  const currentPermission = method.toLowerCase() + ':' + path.split('/')[2];
  const userPermissions = req?.role?.permissions;

  // check if user has permission to access the path
  if (!userPermissions.includes(currentPermission)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
}

module.exports = verifyRole;