const { StatusCodes } = require('http-status-codes')
const CustomApiError = require('../errors')
const db = require('../models')

// create main Model
const FarmBuilding = db.farm_buildings
const Unit = db.units

// @desc      Get all units
// @route     /api/v1/unit
const getAllUnits = async (req, res) => {
  const units = await Unit.findAll({
    include: 'farm_buildings',
  })

  res.status(StatusCodes.OK).json({
    status: 'success',
    units,
    count: units.length,
  })
}

// @desc      Create unit
// @route     POST /api/v1/unit
const createUnit = async (req, res) => {
  const { farmBuildingId, name } = req.body
  const building = await FarmBuilding.findOne({ where: { id: farmBuildingId } })
  if (!building)
    throw new CustomApiError.NotFoundError(`Farm building not found`)
  const unit = await Unit.create({
    name,
    health: Math.floor(Math.random() * (100 - 50 + 1) + 50),
    buildingId: building.id,
  })

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    unit,
  })
}

// @desc      Add health to the farm unit
// @route     POST /api/v1/unit/:id/health
const addHealthToUnit = async (req, res) => {
  const unit = await Unit.findOne({ where: { id: req.params.id } })
  if (!unit) throw new CustomApiError.NotFoundError(`Unit not found`)
  setInterval(async function () {
    unit.health += 1
    await unit.save()
  }, 5000)

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    unit,
  })
}

module.exports = { createUnit, getAllUnits, addHealthToUnit }
