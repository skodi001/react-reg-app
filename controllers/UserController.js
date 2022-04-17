const User = require("../models/User");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    next(err);
  }
};
const deleteUser = async (req, res, next) => {
  const { id } = req.body;
  try {
    await User.findByIdAndDelete({ _id: id });
    return res.json({ msg: "success" });
  } catch (err) {
    next(err);
  }
};
const blockUser = async (req, res, next) => {
  const { id } = req.body;
  try {
    await User.findByIdAndUpdate({ _id: id }, { $set: { isBlocked: true } });
    return res.json({ msg: "success" });
  } catch (err) {
    next(err);
  }
};
const unblockUser = async (req, res, next) => {
  const { id } = req.body;
  try {
    await User.findByIdAndUpdate({ _id: id }, { $set: { isBlocked: false } });
    return res.json({ msg: "success" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  blockUser,
  unblockUser,
};
