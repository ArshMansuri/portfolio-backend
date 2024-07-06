const express = require("express")
const { sendFormData } = require("../controller/user")
const router = express.Router()

router.route('/user/send/formdata').post(sendFormData)

module.exports = router
