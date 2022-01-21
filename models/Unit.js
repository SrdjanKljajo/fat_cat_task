const Sequelize = require('sequelize')
const db = require('../config/db')

const Unit = db.define('units', {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  buildingId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
})

Unit.associate = models => {
  Unit.belongsTo(models.FarmBuilding, {
    foreignKey: 'buildingId',
  })
}

module.exports = Unit
