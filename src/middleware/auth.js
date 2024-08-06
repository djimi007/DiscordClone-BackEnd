const jwt = require("jsonwebtoken");

const { TOKEN_KEY } = process.env;

const virifyToken = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.header["x-access-token"];

  if (!token) {
    return res.status(403).send("the authentification token is required");
  }

  try {
    const decodeToken = jwt.verify(token, TOKEN_KEY);
    req.currentUser = decodeToken;
  } catch (error) {
    return res.status(401).send("invalid token provided");
  }

  return next();
};
module.exports = virifyToken;
