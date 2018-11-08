const Sequelize = require('sequelize')
const db = require('../db')

const Buzz = db.define('buzz', {
    location: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false
    },
    funFactor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    details: {
        type: Sequelize.STRING
    },
    upVote: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    longitude: {
        type: Sequelize.DECIMAL,
        validate: {
            min: -180,
            max: 180
        }
    },
    latitude: {
        type: Sequelize.DECIMAL,
        validate: {
            min: -90,
            max: 90
        }
    }
});

module.exports = Buzz