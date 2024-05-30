const express=require("express")
const accountRouter=express.Router();
const {authMiddleware}=require("../middleware/authMiddleware.js")
const {getBalance,transferMoney}=require("../controller/account.js")


accountRouter.route("/balance").get(authMiddleware,getBalance)
accountRouter.route("/transfer").post(authMiddleware,transferMoney)

module.exports={accountRouter}