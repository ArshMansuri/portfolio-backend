const express = require("express")
const { getHomeData } = require("../controller/homeData")
const router = express.Router()


router.route('/user/get/homedata').post(getHomeData)

module.exports = router
