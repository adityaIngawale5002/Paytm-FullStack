const { Account } = require("../model/user.models")
const {mongoose}=require("mongoose")
const getBalance=async(req,res)=>{
    const account=await Account.findOne({
        userId:req.userId,
    });
    res.json({
        balance:account.Balance
    })
}

const transferMoney=async(req,res)=>{

    const session=await mongoose.startSession();

    session.startTransaction();
    const {amount,to}=req.body;
    const account=await Account.findOne({userId:req.userId}).session(session);

    if(!account || account.Balance<amount){
        await session.abortTransaction()
        return res.status(400).json({
            message:"insufficient balance"
        })
    }
    const toAccount=await Account.findOne({userId:to}).session(session);

    await Account.updateOne({userId:req.userId},{$inc:{Balance:-amount}}).session(session)
    await Account.updateOne({userId:to},{$inc:{Balance:amount}}).session(session)

    await session.commitTransaction();

    res.status(200).json({
        message:"Transfer successful"
    })

}

module.exports={
    getBalance,transferMoney
}