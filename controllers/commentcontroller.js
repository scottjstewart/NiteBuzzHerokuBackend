let db = require("../db");
let comment = require("../models/comment");
let buzz = require("../models/buzz");
let user = require("../models/user");
let validateSession = require("../middleware/validate-session");
let express = require("express");

module.exports = (app, db) => {
  app.get("/commnets", (req, res) => {
    sequelize.users
      .findAll({
        include: [
          {
            model: db.buzzs,
            include: [
              {
                model: db.comment
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
                          buzzId: comment.buzzId,
                          userId: comment.userId,
                          text: comment.text,
                          commenter: comment.commenter
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

  app.get("/comment/get", validateSession, (req, res) => {
    comment
      .findAll()
      .then(comment => res.status(200).json(comment))
      .catch(err => res.status(500).json({ error: err }));
  });

  app.get("/comment/own", validateSession, (req, res) => {
    comment
      .findAll({ where: { owner: req.user.id } })
      .then(comment => res.status(200).json(comment))
      .catch(err => res.status(500).json({ error: err }));
  });

  app.post("/comment/add/:buzzId", validateSession, (req, res) => {
    comment.create({ text: req.body.text }).then(async comm => {
      await comm.setCommenter(req.user);

      await user.findOne({ where: { id: req.user.id } }).then(usr => {
        usr.addComment(comm);
      });
      await buzz.findById(req.params.buzzId).then(buz => {
        buz.addComments(comm);
        comm.setBuzz(buz);
      });
      comment
        .findOne({
          where: { id: comm.id },
          include: [
            {
              model: user,
              as: "Commenter",
              attributes: ["userName"]
            }
          ]
        })
        .then(nComm => {
          res.status(200).send(nComm);
        });
    });
  });

  app.put("/comment/update/:id", validateSession, (req, res) => {
    comment
      .findOne({
        where: { id: req.params.id }
      })
      .then(comms => {
        if (comms.userId === req.user.id) {
          comms
            .update({
              text: req.body.text,
              edited: true
            })
            .then(buzz => {
              comment
                .findOne({
                  where: { id: req.params.id },
                  include: [
                    {
                      model: user,
                      as: "Commenter",
                      attributes: ["userName"]
                    }
                  ]
                })
                .then(comm => res.status(200).json(comm));
            })
            .catch(err => res.json(req.error));
        } else {
          res.status(500).json({
            message: `User does not own ${req.params.id}`
          });
        }
      });
  });

  app.delete("/comment/delete/:id", validateSession, (req, res) => {
    comment
      .findOne({
        where: { id: req.params.id }
      })
      .then(comment => {
        if (comment.userId === req.user.id) {
          comment
            .destroy({ where: { id: req.params.id } })
            .then(comment =>
              res.status(200).json({
                status: 200,
                message: "Comment deleted"
              })
            )
            .catch(err => res.json(req.error));
        } else {
          res.status(500).json({
            message: `Comment Deleted`
          });
        }
      });
  });
};
