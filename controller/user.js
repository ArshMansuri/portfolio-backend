const FormData = require("../model/FormData");

exports.sendFormData = async (req, res) => {
  try {
    const { username, email, subject, message } = req.body;

    if (!username || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Enter all filds",
      });
    }

    const formData = FormData.create({
        username, email, subject, message
    })

    return res.status(200).json({
        success: true,
        message: "Your Message Send Successfully"
    })

  } catch (error) {
    console.log("Catch Error:: ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
