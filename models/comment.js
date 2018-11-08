const Sequelize = require('sequelize')
const db = require('../db')


const Comment = db.define('comment', {
    text: {
        type: Sequelize.STRING
    },
    upVote: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
});

module.exports = Comment