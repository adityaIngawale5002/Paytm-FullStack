const express=require("express")
const mainRouter=express();
const {userRouter}=require("./userRouter.js")
const {accountRouter}=require("./accountRouter.js")

mainRouter.use("/user",userRouter);
mainRouter.use("/account",accountRouter)


module.exports={mainRouter};