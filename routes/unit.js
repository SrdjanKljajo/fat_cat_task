const express = require('express')
const router = express.Router()

const {
  createUnit,
  getAllUnits,
  addHealthToUnit,
} = require('../controllers/unit')

router.route('/').get(getAllUnits).post(createUnit)
router.route('/:id/health').patch(addHealthToUnit)

module.exports = router
