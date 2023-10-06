const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const bcrypt = require("bcrypt")

exports.registerUser = async (req,res) => {
    try {
        const {username,email,password} = req.body;


          //all the fields check
          if(username === "" || email === "" || password === ""){
            return res.status(400).json({error:"All the fields required"})
         }
         
        //unique email verification
        const existingEmail = await User.findOne({email})
        if(existingEmail){
          return  res.status(400).json({error:"Email is alredy registered"})
        }
       //hash password
       const saltRounds = 10;
       const hashedPassword = await bcrypt.hash(password,saltRounds)
       //create new user
       const newUser = new User({username,email,password:hashedPassword})
       await newUser.save()

       // issue jwt token after registation
       const token = jwt.sign({username:newUser.username},secret)

       res.status(201).json({ message: "user created successfully", token,newUser })

    } catch (error) {
        console.error(error); // Log the actual error for debugging
        res.status(500).json({ error: "Internal server error" }); // Send an error response
    }
}