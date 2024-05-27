const bcrypt=require("bcrypt")
const User=require("../modals/Users")
const jwt=require("jsonwebtoken");
require("dotenv").config

//singup handlers 
exports.Signup=async(req,res)=>{
    try{
    //get data

    const{name,email,password,role}=req.body
const existingUser=await User.findOne({email});
 if(existingUser){
    return res.status(400).json({
        success:false,
        message:"User already exist"
    })
 }

 //secure password 

let hashedPassword;
try{
    hashedPassword=await bcrypt.hash(password,10)

}catch(err){
    return res.status(500).json({
        success:false,
        message:"error in hasing password"
    })
}
 
//create entry
const user= await User.create({
    name,email,password:hashedPassword,role
})
return res.status(200).json({
    success:true,
    message:"user created succesfuuly"
})
    }catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: 'Internal server error',
          error: error.message
        });
      }
     
}

exports.Login=async(req,res)=>{
    try{

        //data fetch 
        const{email,password}=req.body

        //validation on email and password

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the details carefully"
            })
        }

        //check for registred user

        const user=await User.findOne({email})
        //agar user register nahi hai
        
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered"
            })
        }


    const payload={
        email:User.email,
        id:User,
        role:User.role
    }
        //verify password and generate a JSW Token
        if(await bcrypt.compare(password,user.password)){
           let token =jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h"
           });
           user.toekn=token;
           user.password=undefined;
 const options={
expires: new Date(Date.now()+3 *24 *60 *60 *100),
httOnly:true,
 }
res.cookie("token",token,options).status(200).json({
    success:true,
    token,
    user,
    message:"User logged in successfully"
})
            
        }else{
            return res.status(403).json({
                success:false,
                message:"Password Incorrect"
            })
        }
    }catch(error){
console.log(error);
return res.status(500).json({
    success:false,
    message:"login failed"
})
    }
}