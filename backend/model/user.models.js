const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true,
        minLength:6,
        maxLength:30
    },
    password:{
        type:String,
        require:true,
        minlength:6
    },
    firstName:{
        type:String,
        require:true,
        trim:true,
        maxLength:30

    },
    lastName:{
        type:String,
        require:true,
        trim:true,
        maxLength:30
    }
})

const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    Balance:{
        type:Number,
        require:true
    }
})

 const Account=mongoose.model("Account",accountSchema);
 const User=mongoose.model("User",userSchema);

module.exports={
    Account,User
}