const { StatusCodes } = require('http-status-codes')
const Unit = require('../models/Unit')
const CustomApiError = require('../errors')
const FarmBuilding = require('../models/FarmBuilding')

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

module.exports = { createUnit }
