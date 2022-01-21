const express = require('express')
const router = express.Router()

const { createUnit } = require('../controllers/unit')

router.route('/').post(createUnit)

module.exports = router
