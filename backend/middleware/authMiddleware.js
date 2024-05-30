const jwt=require("jsonwebtoken")

const authMiddleware =(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        res.status(400).json({message:"you are unauthenticated"})
    }

    const token=authHeader.split(' ')[1];
    
    try {
        const decode=jwt.verify(token,"jwtsecret");
        if(!decode){
            res.status(400).json({msg:"wrong jwt token"})
        }
        req.userId=decode.id //might have error
        next();
    } catch (error) {
        return res.status(400).json({})
    }
}

module.exports={authMiddleware}