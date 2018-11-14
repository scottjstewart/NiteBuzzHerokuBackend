const jwt = require("jsonwebtoken");
const db = require("../db");
const User = require("../models/user");

module.exports = function(req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  } else {
    let token = req.headers.authorization;
    if (!token)
      return res
        .status(403)
        .send({ auth: false, message: "No token provided." });
    else {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (decoded.status === 1) {
          if (decoded) {
            User.findOne({ where: { id: decoded.id } }).then(
              user => {
                req.user = user;
                next();
              },
              function() {
                res.status(401).send({ error: "not Authorized" });
              }
            );
          } else {
            res.status(400).send({ error: "Not authorized" });
          }
        } else {
          res.status(401).send({ message: "Insufficient priveledges" });
        }
      });
    }
  }
};
