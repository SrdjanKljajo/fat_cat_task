const { StatusCodes } = require('http-status-codes')
const CustomApiError = require('../errors')
const db = require('../models')

// create main Model
const FarmBuilding = db.farm_buildings
const Unit = db.units

// @desc      Get all units
// @route     /api/v1/building
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
  const unit = await Unit.create({
    name,
    buildingId: building.id,
  })

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    unit,
  })
}

module.exports = { createUnit, getAllUnits }
