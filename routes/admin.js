const express = require("express")
const { makeAdmin, adminLogin, adminLogout, loadAdmin, updateProjectCount, updateSkill, updateAllSkills } = require("../controller/admin")
const { isAdminAuth } = require("../middleware/userAuth")
const router = express.Router()

router.route('/admin/login').post(adminLogin)
router.route('/admin/logout').get(isAdminAuth, adminLogout)
router.route('/admin/me').get(isAdminAuth, loadAdmin)
router.route('/admin/signup').post(makeAdmin)

router.route("/admin/update/projectcount/:count").get(isAdminAuth, updateProjectCount)

router.route("/admin/update/allskill").post(isAdminAuth, updateAllSkills)
router.route("/admin/update/skill").post(isAdminAuth, updateSkill)

module.exports = router
