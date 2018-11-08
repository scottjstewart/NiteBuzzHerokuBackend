let express = require('express');
let router = express.Router();
let db = require('../db')
let Client = require('../models/client')
let User = require('../models/user')
let validateSession = require('../middleware/validate-session')


router.get('/', (req, res) => {
    Client.findAll()
        .then(client => res.status(200).json(client))
        .catch(err => res.status(500).json({ error: err }))
})

router.get('/own', (req, res) => {
    Client.findAll({ where: { owner: req.user.id } })
        .then(client => res.status(200).json(client))
        .catch(err => res.status(500).json({ error: err }))
})

router.get('./get', (req, res) => {
    User.findAll()
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({ error: err }))
})

router.post('/create', (req, res) => {
    Client
        .create({
            venueName: req.body.venueName,
            location: req.body.location,
            deal: req.body.deal,
            details: req.body.details,
            owner: req.user.id
        }).then(
            function creatSuccess(client) {
                res.json({
                    client: client,
                    message: 'Event added'
                })
            },
            function createError(err) {
                res.send(500, err.message)
            }
        )
})

router.put('/update/:id', (req, res) => {
    Client.findOne({ where: { id: req.params.id } }).then(
        client => {
            if (client.owner === req.user.id) {
                Client.update(req.body, { where: { id: req.params.id } })
                    .then(client => res.status(200).json(client))
                    .catch(err => res.json(req.error))
            } else {
                res.status(500).json({
                    message: `user does not own ${req.params.id}`
                })
            }
        })
})

router.delete('/delete/:id', (req, res) => {
    Client.findOne({ where: { id: req.params.id } }).then(client => {
        if (client.owner === req.user.id) {
            Client.destroy({ where: { id: req.params.id } })
                .then(client => res.status(200).json(client))
                .catch(err => res.json(req.error))
        } else {
            res.status(500).json({
                message: `Nope!`
            })
        }
    })
})

module.exports = router