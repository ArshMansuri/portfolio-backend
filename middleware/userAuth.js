const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin");

exports.isAdminAuth = async (req, res, next) => {
  try {
    const { admintoken } = req.cookies;
    if (!admintoken) {
      return res.status(401).json({ message: "Login First" });
    }

    const decoded = jwt.verify(admintoken, process.env.JWT);
    req.admin = await Admin.findById(decoded._id);
    const admin = await Admin.findById(req.admin._id);
    if (!admin.isActive) {
      return res
        .status(401)
        .json({ success: false, message: "Admin is not active" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

