const express=require("express")

const router=express.Router();

const {Signup,Login,ForgetPassword,ResetPassword} =require('../controllers/Auth')


router.post("/signup",Signup)
router.post("/login",Login)
router.post("/forget-password",ForgetPassword)
router.post("/reset-password/:id/:token",ResetPassword)

//Protected Route
// router.get("/test",auth,(req,res)=>{
//     res.json({
//         success:true,
//         message:"Welcome to the protected routes for Tests"
//     })
// })
// router.get("/student",auth,isStudent,(req,res)=>{
//     res.json({
//         success:true,
//         message:"Welcome to the protected routes for student"
//     })
// })

// router.get("/Admin",auth,isAdmin,(req,res)=>{
//     res.json({
//         success:true,
//         message:"Welcome to the protected routes for Admin"
//     })
// })
module.exports=router;
