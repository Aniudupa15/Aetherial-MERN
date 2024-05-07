const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/error.js");

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        throw errorHandler(400, 'All fields are required');
    }
    const hashPass = bcrypt.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashPass
    });

    await newUser.save();
    res.status(200).json({
        message: "User created successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
