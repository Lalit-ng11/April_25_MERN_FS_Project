import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserSchema from '../models/User.js';

const router = express.Router();

// User Registration 
router.post('/register',async(req,res)=>{
    try {
        const {name,email,password} = req.body;
      
        // Error Handling for Registration Feilds 
        if(!name || !email || !password){
            return res.status(400).json({message:"All Fields are Required..!"})
        }
        
        // Error Handling for existing user
        const existinguser = await UserSchema.find({email});
        if(existinguser){
             return res.status(400).json({message:"Email-Id is Already Registered..!"})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new UserSchema({
            name,
            email,
            password:hashedPassword
        });
        const saveUser = await user.save();

        res.status(201).json({
            message:"User Registered Successfully..",
            user:saveUser
        });
    } catch (error) {
        res.status(400).json({
            message:"Registration Failed..!",
            error:error.message
        })
    }
})

// User Login 
router.post('/login',async(req,res)=>{
    const {email,password} = req.body;

    const user = await UserSchema.findOne({email});

    try {
        if(!user || !(await bcrypt.compare(password,user.password)))
            return res.status(401).json({
        message:'Invalid Email and Password..!'});

        const token = jwt.sign({
            _id:user._id,
            email:user.email,
            password:user.password
        },process.env.JWT_SECRET,{
            expiresIn:'1d'
        })
        res.json({token})
        } catch (error) {
            console.log(error);
            res.status(504).json({message:"Server Error"})
            
    }
})
export default router;