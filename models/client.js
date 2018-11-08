const Sequelize = require('sequelize')
const db = require('../db')

const Client = db.define('client', {
    venueName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false
    },
    deal: {
        type: Sequelize.STRING,
        allowNull: false
    },
    details: {
        type: Sequelize.STRING,
        allowNull: false
    },
    owner: {
        type: Sequelize.UUID
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
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    zip: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            len: [5, 5]
        }
    }
})

module.exports = Client