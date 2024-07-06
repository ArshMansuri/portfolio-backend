const Admin = require("../model/Admin");

exports.makeAdmin = async (req, res) => {
  try {
    
    const { email, password, username } = req.body;

    const admin = await Admin.create({
      email,
      password,
      username,
      isActive: true,
    });
    return res.status(201).json({ success: true, admin });
  } catch (error) {
    console.log("Catch Error:: ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Enter all filds",
      });
    }

    const admin = await Admin.findOne({ email: email }).select("+password");
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid detail",
      });
    }

    if (!admin.isActive) {
      return res.status(400).json({
        success: false,
        message: "Inactive Admin",
      });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid detail",
      });
    }

    const admintoken = await admin.CreateToken();

    const sendAdmin = {
      email: admin.email,
      isActive: admin.isActive,
    };

    return res
      .status(200)
      .cookie("admintoken", admintoken, {
        httpOnly: true,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        sameSite: "None",
        secure: true,
      })
      .json({
        success: true,
        message: "Login successfully",
        admin: sendAdmin,
        admintoken,
      });
  } catch (error) {
    console.log("Catch Error:: ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.adminLogout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("admintoken", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite: "None",
        secure: true,
      })
      .json({
        success: true,
        message: "Logout Successfully",
      });
  } catch (error) {
    console.log("Catch Error" + error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.loadAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    return res.status(200).json({ success: true, admin });
  } catch (error) {
    console.log("Catch Error:: ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProjectCount = async (req, res) => {
  try {

    const {count} = req.params;

    if(!count){
      return res.status(400).json({
        success: false,
        message: "Enter Project Count"
      });
    }

    const admin = await Admin.findById(req.admin._id);
    admin.projectCount = count;
    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Project Count Updated",
      admin
    });

  } catch (error) {
    console.log("Catch Error:: ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.updateAllSkills = async (req, res) => {
  try {

    const {skills} = req.body;

    if(!skills || skills[0] === undefined || skills.length !== 6){
      return res.status(400).json({
        success: false,
        message: "Enter Skills"
      });
    }

    const admin = await Admin.findById(req.admin._id);
    admin.skills = skills;
    await admin.save();

    return res.status(200).json({
      success: true,
      message: "All Skills Updated",
      admin
    });

  } catch (error) {
    console.log("Catch Error:: ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.updateSkill = async (req, res) => {
  try {

    const {skillName, skillPercentage, oldSkillId} = req.body;

    if(!skillName || !skillPercentage || !oldSkillId){
      return res.status(400).json({
        success: false,
        message: "Enter All Detail"
      });
    }

    const admin = await Admin.findById(req.admin._id);
  
    const index = admin.skills.findIndex(obj=> obj._id.toString() === oldSkillId.toString())

    if(index === -1){
      return res.status(400).json({
        success: false,
        message: "Old Skill Id Not Valid"
      });
    }

    admin.skills[index].lanName = skillName;
    admin.skills[index].percentage = skillPercentage;

    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Skill Updated",
      admin
    });

  } catch (error) {
    console.log("Catch Error:: ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
