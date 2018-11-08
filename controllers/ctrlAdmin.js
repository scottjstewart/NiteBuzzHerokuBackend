let comment = require("../models/comment");
let buzz = require("../models/buzz")
let user = require("../models/user")
let validateSession = require("../middleware/validate-session");

module.exports = (app, db) => {
    app.get('/admin/users/:perPage/:page', validateSession, (req, res) => {
        user.findAndCountAll({
            limit: req.params.perPage,
            offset: req.params.page * req.params.perPage,
            attributes: [
                'id',
                'userName',
                'firstName',
                'lastName',
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
            ]
        })
            .then(
                result => {
                    res.status(200).send(result)
                }
            )
    })
}