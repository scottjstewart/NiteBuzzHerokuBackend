let express = require("express");
let db = require("../db");
let buzz = require("../models/buzz");
let user = require("../models/user");
let comment = require("../models/comment");
let validateSession = require("../middleware/validate-session");

module.exports = (app, db) => {
  app.get("/buzz/user", (req, res) => {
    db.users
      .findAll({
        include: [
          {
            model: db.buzzs,
            include: [
              {
                model: db.comments
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
              upVote: user.upVote,
              buzzs: user.buzzs.map(post => {
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
          );
        });
        res.json(resObj);
      });
  });
  app.get("/buzz/get", (req, res) => {
    buzz
      .findAll({
        include: [
          {
            model: comment,
            as: "Comments",
            include: [
              {
                model: user,
                as: "Commenter",
                attributes: ["userName"]
              }
            ]
          }
        ]
      })
      .then(buzz => res.status(200).send(buzz))
      .catch(err => res.status(500).json({ error: err }));
  });

  app.get("/buzz/own", (req, res) => {
    buzz
      .findAll({ where: { owner: req.user.id } })
      .then(buzz => res.status(200).json(buzz))
      .catch(err => res.status(500).json({ error: err }));
  });

  app.get("/buzz/byId/:id", (req, res) => {
    buzz
      .findOne({
        where: { id: req.params.id },
        include: [
          {
            model: user,
            as: "Buzzer",
            attributes: ["userName"]
          },
          {
            model: comment,
            as: "Comments",
            include: [
              {
                model: user,
                as: "Commenter",
                attributes: ["userName"]
              }
            ]
          }
        ]
      })
      .then(buzz => {
        if (buzz) {
          res.status(200).send(buzz);
        }
      });
  });

  app.post("/buzz/makeBuzz", validateSession, (req, res) => {
    buzz
      .create({
        userId: req.user.id,
        location: req.body.location,
        price: req.body.price,
        funFactor: req.body.funFactor,
        details: req.body.details,
        longitude: req.body.longitude,
        latitude: req.body.latitude
      })
      .then(
        function createSuccess(buzz) {
          buzz.setBuzzer(req.user.id);
          res.status(200).send(buzz);
        },
        function createError(err) {
          res.send(500, err.message);
        }
      );
  });

  app.put("/buzz/update/:id", validateSession, (req, res) => {
    buzz.findOne({ where: { id: req.params.id } }).then(buzz => {
      if (buzz.userId === req.user.id) {
        buzz
          .update(req.body, { where: { id: req.params.id } })
          .then(buzz => res.status(200).json(buzz))
          .catch(err => res.json(req.error));
      } else {
        res.status(500).json({
          message: `User does not own ${req.params.id}`
        });
      }
    });
  });
  app.delete("/buzz/delete/:id", validateSession, (req, res) => {
    buzz.findOne({ where: { id: req.params.id } }).then(buzz => {
      if (buzz.userId === req.user.id) {
        buzz
          .destroy({ where: { id: req.params.id } })
          .then(buzz => res.status(200).json(buzz))
          .catch(err => res.json(req.error));
      } else {
        res.status(500).json({
          message: `C'mon man! don't delete other peoples stuff!`
        });
      }
    });
  });

  // app.post('/buzz/comment/:buzzId', (req, res) => {
  //   buzz.findOne({ where: { id: req.params.buzzId } }).then(
  //     buz => {
  //       buz.setComments()
  //     }
  //   )
  // })
};
