
let comment = require("../models/comment");
let buzz = require("../models/buzz")
let user = require("../models/user")
let validateSession = require("../middleware/validate-session");
let validateAdmin = require('../middleware/validate-admin')

module.exports = (app, db) => {
    app.get('/admin/users/', validateAdmin, (req, res) => {
        user.findAndCountAll({
            attributes: [
                'id',
                'userName',
                'firstName',
                'email',
                "pet",
            ],
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
                                    attributes: ['userName', 'id']
                                }
                            ]
                        },
                        {
                            model: user,
                            as: 'Buzzer',
                            attributes: ['userName', 'id']
                        }
                    ]
                }
            ],
            limit: req.query.pageSize,
            offset: req.query.pageNumber * req.query.pageSize
        })
            .then(
                result => {
                    let users = []
                    result.rows.forEach(
                        usr => {

                            usr.role = usr.pet === 'squirrel' ? 'user' : usr.pet === 'cat' ? 'client' : usr.pet === 'dog' ? 'admin' : 'user'

                            nUsr = {
                                id: usr.id,
                                userName: usr.userName,
                                firstName: usr.firstName,
                                email: usr.email,
                                role: usr.role
                            }
                            users.push(nUsr)
                        }
                    )
                    count = result.count
                    res.status(200).send({ users, count })
                }
            )
    })

    app.get('/admin/user/count', validateAdmin, (req, res) => {
        user.count().then(count => {
            res.status(200).json({ count: count })
        })
    })

    app.get('/admin/buzzes', validateAdmin, (req, res) => {
        buzz.findAll({
            limit: req.query.pageSize,
            offset: req.query.pageNumber * req.query.pageSize,
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
                },
                {
                    model: user,
                    as: 'Buzzer',
                    attributes: ['userName']
                }
            ]
        }).then(
            buzzes => {
                res.status(200).send(buzzes)
            }
        )
    })

    app.get('/admin/buzz/count', validateAdmin, (req, res) => {
        buzz.count().then(count => {
            res.status(200).json({ count: count })
        })
    })

    app.delete('/admin/user/delete/:id', validateAdmin, (req, res) => {
        user.destroy({ where: { id: req.params.id } })
            .then(rez => res.status(200).send({ message: `User ${req.params.id} successfully destroyed.`, success: true }))
            .catch(err => {
                res.status(500).send({ message: err.message, error: err, success: false })
                console.log(err)
            })
    })

    app.delete('/admin/buzz/delete/:id', validateAdmin, (req, res) => {
        buzz.destroy({ where: { id: req.params.id } })
            .then(rez => res.status(200).send({ message: `Buzz ${req.params.id} successfully deleted`, success: true }))
            .catch(err => res.status(500).send({ message: err.message, error: err, success: false }))
    })
}