const express = require('express')
const router = express.Router()

const { createUnit, getAllUnits } = require('../controllers/unit')

router.route('/').get(getAllUnits).post(createUnit)

module.exports = router
