const Admin = require("../model/Admin");

exports.getHomeData = async (req, res) => {
  try {

    const { isUpdateVisitor } = req.body;
    const adminData = await Admin.findOne({ isActive: true });
    console.log("come")
    if (!adminData) {
      return res.status(400).json({
        success: false,
        message: "Admin Data Not Avilable",
      });
    }
    if(isUpdateVisitor){
        adminData.visitorCount = adminData.visitorCount + 1;
        await adminData.save()
    }

    return res.status(200).json({
      success: true,
      adminData,
    });

  } catch (error) {
    console.log("Catch Error:: ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
