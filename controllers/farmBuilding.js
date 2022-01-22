const { StatusCodes } = require('http-status-codes')
const CustomApiError = require('../errors')
const db = require('../models')

// create main Model
const FarmBuilding = db.farm_buildings
const Unit = db.units

// @desc      Get all buildings and count of units
// @route     GET /api/v1/building
const getAllBuildings = async (req, res) => {
  const building = await FarmBuilding.findAndCountAll({
    include: [{ model: Unit, as: 'units', attributes: ['name'] }],
  })

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

// @desc      Get units by farm building and count them
// @route     GET /api/v1/building/:slug/units
const getFarmBuildingFarmUnit = async (req, res) => {
  const slug = req.params.slug
  const building = await FarmBuilding.findOne({
    where: { slug },
    include: 'units',
  })

  const FarmBuildingFarmUnit = building.units
  const NumberOfUnits = FarmBuildingFarmUnit.length

  if (NumberOfUnits < 1) {
    return res.status(StatusCodes.OK).json({
      status: 'success',
      msg: `Farm building ${building.name} not have a units`,
    })
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    farmBuilding: building.name,
    health: FarmBuildingFarmUnit.health,
    count: `Farm building ${building.name} has ${NumberOfUnits} units`,
  })
}

module.exports = { getAllBuildings, createBuilding, getFarmBuildingFarmUnit }
