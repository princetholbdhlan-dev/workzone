const {
  findUserById,
  updateUser
} = require("../models/userModel");

async function getProfile(req, res) {
  try {
    const user = await findUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch profile"
    });
  }
}

async function updateProfile(req, res) {
  try {
    const name = req.body.name?.trim();
    const avatar = req.body.avatar?.trim();

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required"
      });
    }

    const user = await updateUser(
      req.user.id,
      name,
      avatar
    );

    res.json({
      success: true,
      message: "Profile updated",
      user
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to update profile"
    });
  }
}

module.exports = {
  getProfile,
  updateProfile
};
