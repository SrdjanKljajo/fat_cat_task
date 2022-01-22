const express = require('express')
const router = express.Router()

const {
  createBuilding,
  getAllBuildings,
  getFarmBuildingFarmUnit,
} = require('../controllers/farmBuilding')

router.route('/').get(getAllBuildings).post(createBuilding)
router.route('/:slug/units').get(getFarmBuildingFarmUnit)
module.exports = router
