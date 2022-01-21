const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.farm_buildings = require('./farmBuilding.js')(sequelize, DataTypes)
db.units = require('./unit.js')(sequelize, DataTypes)

// 1 to Many Relation

db.farm_buildings.hasMany(db.units, {
  foreignKey: 'buildingId',
  as: 'units',
})

db.units.belongsTo(db.farm_buildings, {
  foreignKey: 'buildingId',
  as: 'farm_buildings',
})

module.exports = db
