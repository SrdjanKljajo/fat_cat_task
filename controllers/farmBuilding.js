const { StatusCodes } = require('http-status-codes')
const CustomApiError = require('../errors')
const db = require('../models')

// create main Model
const FarmBuilding = db.farm_buildings
const Unit = db.units

// @desc      Get all buildings
// @route     GET /api/v1/building
const getAllBuildings = async (req, res) => {
  const building = await FarmBuilding.findAll({ include: 'units' })

  res.status(StatusCodes.OK).json({
    status: 'success',
    building,
  })
}
// @desc      Create building
// @route     POST /api/v1/building
const createBuilding = async (req, res) => {
  const { name } = req.body
  const building = await FarmBuilding.create({ name })

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    building,
  })
}

// @desc      Get units by form building
// @route     GET /api/v1/building/:uuid/units
const getFarmBuildingFarmUnit = async (req, res) => {
  const uuid = req.params.uuid
  const building = await FarmBuilding.findOne({
    where: { uuid },
    include: 'units',
  })
  const FarmBuildingFarmUnit = building.units
  const NumberOfUnits = FarmBuildingFarmUnit.length

  if (NumberOfUnits < 1) {
    return res.status(StatusCodes.OK).json({
      status: 'success',
      msg: `Farm building ${uuid} not have a units`,
    })
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    farmBuilding: building.name,
    FarmBuildingFarmUnit,
    count: `Farm building ${building.name} has ${NumberOfUnits} units`,
  })
}

module.exports = { getAllBuildings, createBuilding, getFarmBuildingFarmUnit }
