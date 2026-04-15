const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controllers");

const authRouter = express.Router();

/*  POST /api/v1/user/register */
authRouter.post("/register", registerUser);

/* POST /api/v1/user/login */
authRouter.post("/login", loginUser);

module.exports = authRouter;
