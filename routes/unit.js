const express = require('express')
const router = express.Router()

const { createUnit, addHealthToUnit } = require('../controllers/unit')

router.route('/').post(createUnit)
router.route('/:id/health').patch(addHealthToUnit)

module.exports = router
