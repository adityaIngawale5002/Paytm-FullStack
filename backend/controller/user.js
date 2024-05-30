const zod=require("zod")
const jwt=require("jsonwebtoken")
const { User,Account }=require("../model/user.models.js")
const { error } = require("console")

//zod validation
const userpayload=zod.object({
    username:zod.string(),
    password:zod.string(),
    lastName:zod.string(),
    firstName:zod.string()
})
const userSigninPayload=zod.object({
    username:zod.string(),
    password:zod.string()
})



const signUp=async(req,res)=>{
    const user=req.body
    console.log(user)
    const {success}=userpayload.safeParse(user);
    if(!success){
        res.status(400).json({
            msg:"all fileds are require"
        })
    }

    // const findUser=await User.findOne({username:user.username}).maxTimeMS(30000);

    // if(findUser){
    //     res.status(400).json({
    //         msg:"user already exists"
    //     })
    // }
    let findUser;
        try {
            await User.findOne({username:user.username})
            .then((response)=>{
                console.log(response,"here in try");
                if(response!=null){
                    throw(error)
                }
                 findUser=response;
            })
           
        } catch (error) {
                console.log(error,"here in catch")
                return res.status(400).json({
                    msg:"user already exists"
                })
        }
    
    let createUser;
    try {
        createUser=await User.create(user);
        await Account.create({
            userId:createUser._id,
            Balance:1+Math.random()*10000
        });
    } catch (error) {
        console.log(error,"here in catch")
        return res.status(400).json({
            msg:"something went wrong try again later"
        })
    }

    
    const token=jwt.sign({id:createUser._id},"jwtsecret")
    res.status(200).json({
        username:createUser.username,
        msg:"created user",
        token
    })
}
const signIn=async (req,res)=>{
   
    const user=req.body;
    console.log(req.body)
    const {success}=userSigninPayload.safeParse(user);

    if(!success){
        res.status(400).json({
            msg:"wrong login inputs"
        })
    }

        let findUser;
        try {
            await User.findOne({username:user.username})
            .then((response)=>{
                console.log(response,"here in try");
                if(response==null){
                    throw(error)
                }
                 findUser=response;
            })
           
        } catch (error) {
                return res.status(400).json({
                    msg:"user does not exists"
                })
        }

    const token=jwt.sign({id:findUser._id},"jwtsecret");
    res.status(200).json({
        username:findUser.username,
        msg:"user created successfully",
        token
    })

}

//zod validation for updating
const updatePayload=zod.object({
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
    password:zod.string().optional()
})

const updateUser=async (req,res)=>{
    const userData=req.body
    const {success}=updatePayload.safeParse(userData);
    if(!success){
        res.status(400).json({
            msg:"invalid input credential"
        })
    }
    let updatedUser;
    try {
       updatedUser=await User.findByIdAndUpdate(req.userId,{
            firstName:userData.firstName,
            lastName:userData.lastName,
            password:userData.password
        })    
        
        if(updatedUser==null){
            throw error
            }
    
    } catch (error) {
        
        return res.status(400).json({
            msg:"something went wrong try again"
        })
    }
   
    return  res.status(200).json({
        msg:"user updated successfully",
        username:updatedUser.username
    })
    

}

const getFilteredUser=async(req,res)=>{

    const filter=req.query.filter || "";
    const users=await User.find({
        $or:[
            {
                firstName:{
                    "$regex":filter
                }
            },
            {
                lastName:{
                    "$regex":filter
                }
            }
        ]
    })


    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })


}

module.exports={signUp,signIn,updateUser,getFilteredUser}