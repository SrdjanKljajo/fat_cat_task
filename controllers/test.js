//const { StatusCodes } = require('http-status-codes')
//const { Actor, Movie } = require('../models')
//const CustomApiError = require('../errors')

// @desc      Get actors
// @route     GET /api/v1/actors
const test = async (req, res) => {
  res.json({ status: 'success', msg: 'Ajmo legendce' })
}

module.exports = { test }
