const Sequelize = require('sequelize')
const db = require('../config/db')

const FarmBuilding = db.define('farm_buildings', {
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
})

FarmBuilding.associate = models => {
  FarmBuilding.hasMany(models.Unit, {
    foreignKey: 'buildingId',
  })
}

module.exports = FarmBuilding
