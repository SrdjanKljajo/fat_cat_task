const { StatusCodes } = require('http-status-codes')
const CustomApiError = require('../errors')
const db = require('../models')

// create main Model
const FarmBuilding = db.farm_buildings
const Unit = db.units

// @desc      Create unit
// @route     POST /api/v1/unit
const createUnit = async (req, res) => {
  const { farmBuildingId, unitName } = req.body
  const building = await FarmBuilding.findOne({ where: { id: farmBuildingId } })
  if (!building)
    throw new CustomApiError.NotFoundError(`Farm building not found`)
  const unit = await Unit.create({
    unitName,
    health: Math.floor(Math.random() * (100 - 50 + 1) + 50),
    buildingId: building.id,
  })

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    unit,
  })
}

// @desc      Add health to the farm unit
// @route     PATCH /api/v1/unit/:id/health
const addHealthToUnit = async (req, res) => {
  const unit = await Unit.findOne({ where: { id: req.params.id } })
  if (!unit) throw new CustomApiError.NotFoundError(`Unit not found`)

  const addHealthInterval = async () => {
    unit.health += 1
    await unit.save()
  }

  setInterval(addHealthInterval, 5000)

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    unit,
  })
}

module.exports = { createUnit, addHealthToUnit }
