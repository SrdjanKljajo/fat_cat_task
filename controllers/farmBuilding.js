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
    include: [{ model: Unit, as: 'units', attributes: ['unitName'] }],
  })

  res.status(StatusCodes.OK).json({
    status: 'success',
    building,
  })
}
// @desc      Create building
// @route     POST /api/v1/building
const createBuilding = async (req, res) => {
  const { buildingName, unitName } = req.body

  const building = await FarmBuilding.create({ buildingName })
  const unit = await Unit.create({
    unitName,
    health: Math.floor(Math.random() * (100 - 50 + 1) + 50),
    buildingId: building.id,
  })

  const farmFeedInterval = async () => {
    if (building.buildingFeed > 0) {
      building.buildingFeed -= 1
      await building.save()
    } else {
      building.buildingFeed = 60
    }
  }

  const unitFeedInterval = async () => {
    unit.unitFeed += 1
    await unit.save()
  }

  setInterval(farmFeedInterval, 1000)
  setInterval(unitFeedInterval, 10000)

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
    include: [{ model: Unit, as: 'units', attributes: ['unitName', 'health'] }],
  })

  if (!building)
    throw new CustomApiError.NotFoundError(
      `Farm building ${building.buildingName} not found`
    )

  const farmBuildingFarmUnit = building.units
  const numberOfUnits = farmBuildingFarmUnit.length

  if (numberOfUnits < 1) {
    return res.status(StatusCodes.OK).json({
      status: 'success',
      msg: `Farm building ${building.buildingName} not have a units`,
    })
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    farmBuilding: building.buildingName,
    unitHealthInfo: farmBuildingFarmUnit,
    count: `Farm building ${building.buildingName} has ${numberOfUnits} units`,
  })
}

module.exports = {
  getAllBuildings,
  createBuilding,
  getFarmBuildingFarmUnit,
}
