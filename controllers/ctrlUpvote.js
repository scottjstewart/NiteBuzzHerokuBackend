let buzz = require("../models/buzz")
let user = require("../models/user")
let upvote = require('../models/upvote')
let validateSession = require("../middleware/validate-session");

module.exports = (app, db) => {
    app.post('/plusOne/:buzzId', validateSession, (req, res) => {
        upvote.findOrCreate({
            where: {
                VoterId: req.user.id,
                buzzId: req.params.buzzId
            }
        })
            .spread((vote, created) => {
                upvote.findOne({ where: { id: vote.id } }).then(upvte => {
                    if (created) {
                        user.findOne({ where: { id: req.user.id } })
                            .then(
                                usr => {
                                    upvte.setVoter(usr)
                                }
                            )
                        buzz.findOne({ where: { id: req.params.buzzId } })
                            .then(
                                buz => {
                                    upvte.setVote(buz)
                                    upvote.findAndCountAll({ where: { buzzId: buz.id } })
                                        .then(count => buz.update({ upVote: count.count }))
                                })
                        res.status(200).json({ status: 200, message: '+1' })
                    } else if (!created) {
                        res.status(201).json({ status: 201, message: 'You have already voted for this buzz' })
                    }
                })
            })
            .catch(err => res.status(500).json({ error: err.message }))
    })
}