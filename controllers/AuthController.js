const User = require("../models/User");
const bcrypt = require("bcrypt");
const moment = require("moment");

const register = async (req, res, next) => {
  const { username, email, password, c_password } = req.body;
  const errors = [];
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      errors.push({ error: "Email is already taken" });
    }
    if (user?.username === username) {
      errors.push({ error: "Username is already taken" });
    }
    if (password !== c_password) {
      errors.push({ error: "Password did not match" });
    }
    if (errors.length > 0) {
      return res.json(errors);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const now = new Date();
      await User.create({
        username: username,
        email: email,
        password: hashedPassword,
        regTime: moment(now).format("YY/MM/DD HH:mm:ss"),
        isBlocked: false,
      });
      const user = await User.findOne({ email: email });
      return res.json({
        success: true,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          isBlocked: false,
          regTime: user.regTime,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      errors.push({ error: "Email does not exist" });
    }
    if (user) {
      if (!(await bcrypt.compare(password, user.password))) {
        errors.push({ error: "Password does not exist" });
      }
    }
    if (errors.length > 0) {
      return res.json(errors);
    } else {
      const now = new Date();
      await User.findByIdAndUpdate(
        { _id: user._id },
        { $set: { logTime: moment(now).format("YY/MM/DD HH:mm:ss") } }
      );
      return res.json({
        success: true,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          isBlocked: user.isBlocked,
          logTime: moment(now).format("YY/MM/DD HH:mm:ss"),
          regTime: user.regTime,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
};
