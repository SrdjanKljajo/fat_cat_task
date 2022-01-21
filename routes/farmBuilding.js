const express = require('express')
const router = express.Router()

const {
  createBuilding,
  getAllBuildings,
} = require('../controllers/farmBuilding')

router.route('/').get(getAllBuildings).post(createBuilding)

module.exports = router
