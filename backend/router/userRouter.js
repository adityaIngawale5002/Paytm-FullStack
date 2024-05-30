const express=require("express")
const userRouter=express.Router();
const {signUp,signIn,updateUser,getFilteredUser}=require("../controller/user.js");
const { authMiddleware } = require("../middleware/authMiddleware.js");



userRouter.route("/signup").post(signUp);
userRouter.route("/signin").post(signIn);
userRouter.route("/update").put(authMiddleware,updateUser)
userRouter.route("/bulk").get(authMiddleware,getFilteredUser)

module.exports={userRouter}