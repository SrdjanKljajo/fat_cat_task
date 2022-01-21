const { StatusCodes } = require('http-status-codes')
const FarmBuilding = require('../models/FarmBuilding')
const CustomApiError = require('../errors')

// @desc      Create building
// @route     /api/v1/building
const getAllBuildings = async (req, res) => {
  const building = await FarmBuilding.findAll({})

  res.status(StatusCodes.OK).json({
    status: 'success',
    building,
  })
}
// @desc      Create building
// @route     /api/v1/building
const createBuilding = async (req, res) => {
  const { name } = req.body
  const building = await FarmBuilding.create({ name })

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    building,
  })
}

module.exports = { getAllBuildings, createBuilding }
