const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token.split(" ")[1], "masaiII");

      if (decoded) {
        req.body.authorID = decoded.authorID; //For -> products route
        req.body.author = decoded.author;
        // console.log("decoded", decoded);
        next();
      } else {
        res.send({ msg: "please login " });
      }
    } catch (error) {
      res.send({ msg: error.message });
    }
  } else {
    res.send({ msg: "please login " });
  }
};

module.exports = {
  auth,
};
