let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
let db = require("../db");
let buzz = require('../models/buzz')
let user = require('../models/user')
let comment = require('../models/comment')
let validateSession = require("../middleware/validate-session");

module.exports = (app, db) => {
  app.get("/user", (req, res) => {
    db.users
      .findAll({
        include: [
          {
            model: db.buzzs,
            include: [
              {
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: bcrypt.hashSync(user.password, 10),
                userName: user.userName,
                pet: user.pet,
                buzzs: user.buzzs.map(buzz => {
                  //tidy up the post data
                  return Object.assign(
                    {},
                    {
                      buzzId: buzz.id,
                      userId: buzz.userId,
                      location: buzz.location,
                      price: buzz.price,
                      funFactor: buzz.funFactor,
                      details: buzz.details,
                      comments: buzz.comments.map(comment => {
                        //tidy up the comment data
                        return Object.assign(
                          {},
                          {
                            commentId: comment.id,
                            userId: comment.userId,
                            commenter: comment.commenterUserName
                          }
                        );
                      })
                    }
                  );
                })
              }
            ]
          }
        ]
      })
      .then(users => {
        const resObj = users.map(user => {
          //tidy up the user data
          return Object.assign(
            {},
            {
              userId: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              password: bcrypt.hashSync(user.password, 10),
              userName: user.userName,
              pet: user.pet,
              buzzs: user.buzzs.map(buzz => {
                //tidy up the post data
                return Object.assign(
                  {},
                  {
                    buzzId: buzz.id,
                    userId: buzz.userId,
                    location: buzz.location,
                    price: buzz.price,
                    funFactor: buzz.funFactor,
                    details: buzz.details,
                    comments: buzz.comments.map(comment => {
                      //tidy up the comment data
                      return Object.assign(
                        {},
                        {
                          commentId: comment.id,
                          buzzId: comment.buzzId,
                          userId: comment.userId,
                          commenter: comment.commenterUserName
                        }
                      );
                    })
                  }
                );
              })
            }
          );
        });
        res.json(resObj);
      });
  });

  app.post("/user/signup", (req, res) => {
    // const newUser = req.body;
    user
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        userName: req.body.userName
      })
      .then(newUser => {
        let token = jwt.sign(
          { id: newUser.id },
          process.env.JWT_SECRET,
          { expiresIn: 60 * 60 * 24 }
        );
        let resUser = {
          userName: newUser.userName,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          id: newUser.id
        };
        res.json({
          user: resUser,
          auth: true,
          message: "User successfuly created",
          sessionToken: token
        });
      },
        err => res.status(500).send(err.message)
      );
  })

  app.post("/user/login", (req, res) => {
    user.findOne({ where: { userName: req.body.userName } }).then(
      user => {
        if (user) {
          bcrypt.compare(req.body.password, user.password, (err, matches) => {
            if (matches) {
              let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24
              });
              let resUser = {
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                status: user.pet === 'squirrel' ? 1 : user.pet === 'cat' ? 2 : user.pet === 'dog' ? 3 : 1,
                id: user.id
              };
              res.json({
                user: resUser,
                auth: true,
                message: "Success!",
                sessionToken: token
              });
            } else {
              res.status(502).send({ error: "bad gateway" });
            }
          });
        } else {
          res.status(500).send({ error: "failed to authenticate" });
        }
      },
      err => res.status(501).send({ error: "failed to process" })
    );
  });

  app.get("/user/get", validateSession, (req, res) => {
    user
      .findOne({
        where: { id: req.user.id },
        include: [
          {
            model: buzz,
            as: 'Buzzes',
            include: [
              {
                model: comment,
                as: 'Comments',
                include: [
                  {
                    model: user,
                    as: 'Commenter',
                    attributes: ['userName']
                  }
                ]
              }
            ]
          },
          {
            model: comment,
            as: 'Comment',
          }
        ]
      })
      .then(user => res.status(200).send(user))
      .catch(err => res.status(500).json({ error: err }));
  });

  app.delete("/user/delete", validateSession, (req, res) => {
    if (!req.errors) {
      user
        .destroy({ where: { id: req.user.id } })
        .then(user => res.status(200).json(user))
        .catch(err => res.json(req.error));
    } else {
      res.status(500).json(req.error);
    }
  });

  app.put("/user/update", validateSession, (req, res) => {
    user.findOne({ where: { id: req.user.id } }).then(user => {
      nUser = {
        password:
          req.body.password && req.body.password !== ""
            ? bcrypt.hashSync(req.body.password, 10)
            : user.password,
        firstName:
          req.body.firstName && req.body.firstName !== ""
            ? req.body.firstName
            : user.firstName,
        lastName:
          req.body.lastName && req.body.lastName !== ""
            ? req.body.lastName
            : user.lastName,
        email:
          req.body.email && req.body.email !== ""
            ? req.body.email
            : user.email,
        userName:
          req.body.userName && req.body.userName !== ""
            ? req.body.userName
            : user.userName
      };
      if (!req.errors) {
        user
          .update(nUser)
          .then(userN => res.status(200).json(userN))
          .catch(error => res.json(error));
      } else {
        res.status(500).json(req.error);
      }
    });
  });
};
