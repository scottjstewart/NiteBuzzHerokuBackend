require('dotenv').config()

const Sequelize = require('sequelize');


const sequelize = new Sequelize(process.env.NAME, 'postgres', process.env.PASS, {
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = sequelize

sequelize.authenticate().then(
    function () {
        console.log('Conected to redbadge database');
    },
    function (err) {
        console.log(err);
    }
);


const user = require('./models/user.js')
const buzz = require('./models/buzz.js')
const comment = require('./models/comment.js')
const upvote = require('./models/upvote')

//user associations
user.hasMany(buzz, { as: 'Buzzes' })
user.hasMany(comment, { as: 'Comment' })
user.hasMany(upvote, { as: 'Votes' })

//buzz associations
buzz.hasMany(comment, { as: 'Comments' })
buzz.belongsTo(user, { as: 'Buzzer' })
buzz.hasMany(upvote, { as: 'Votes' })

//comment associations
comment.belongsTo(buzz, { as: 'Buzz' })
comment.belongsTo(user, { as: 'Commenter' })

//upvote associaitons
upvote.belongsTo(user, { as: 'Voter' })
upvote.belongsTo(buzz, { as: 'Vote' })