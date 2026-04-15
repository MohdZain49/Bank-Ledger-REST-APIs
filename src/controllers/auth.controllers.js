const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ENV = require("../lib/env");

/**
 * - user register controller
 * -  POST /api/v1/user/register
 */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({
        message: "All field are required",
        success: false,
      });
    }

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    const token = jwt.sign({ userId: newUser._id }, ENV.JWT_SECRET_KEY, {
      expiresIn: "3d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token: token,
    });
  } catch (error) {
    console.error("Error in user register:\n", error);
    res.status(500).json({
      message: "Something went wrong!",
      success: false,
    });
  }
};

/**
 * - user login controller
 * -  POST /api/v1/user/login
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email }).select("+password")

    if(!user) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, ENV.JWT_SECRET_KEY, {
      expiresIn: "3d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    
    res.status(200).json({
      message: "User login successfully",
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });

  } catch (error) {
    console.error("Error in user login:\n", error);
    res.status(500).json({
      message: "Something went wrong!",
      success: false,
    });
  }
};





module.exports = { registerUser, loginUser };
