// auth,isStudent,isAdmin

const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth=async(req,res,next)=>{
    try{
    //extract jsw token
    //pendibg :other way to fetch token

    const token =req.body.token;

    if(!token){
        return res.status(401).json({
            success:"false",
            message:"Token Missing"
        })
    }

    //verify the token

      try{
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        console.log(decode);
        req.user=decode
      }catch(error){
return res.status(401).json({
    success:false,
    message:"token is invalid"
})
      }
      next();

    }catch(error){
        return res.status(401).json({
            success:false,
            message:"Somethinh went wrong while verifying the token"
        })
    }
}


//authorizations

exports.isStudent=async(req,res,next)=>{
    try{
    if(req.user.role !=="Student"){
        return res.status(401).json({
            success:false,
            message:"This is a proctected routes for student"
        })
    }
    next();
    }catch{
        return res.status(401).json({
            success:"false",
            message:"Token Missing"
        })
    }
}

exports.isAdmin=async(req,res,next)=>{
    try{
        if(req.user.role !=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a proctected routes for admin"
            })
        }
        next();
        }catch{
            return res.status(401).json({
                success:"false",
                message:"Token Missing"
            })
        }
}