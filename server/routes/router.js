const express = require('express')
const router = express.Router()

const { getIndex, postIndex } = require('../controller/controllers')

router.get('/', getIndex )
router.post('/', postIndex )

module.exports = router