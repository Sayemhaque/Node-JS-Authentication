const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const bcrypt = require("bcrypt")

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;


    //all the fields check
    if (username === "" || email === "" || password === "") {
      return res.status(400).json({ error: "All the fields required" })
    }

    //unique email verification
    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return res.status(400).json({ error: "Email is alredy registered" })
    }
    //hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    //create new user
    const newUser = new User({ username, email, password: hashedPassword })
    await newUser.save()

    // issue jwt token after registation
    const token = jwt.sign({ username: newUser.username }, secret)

    res.status(201).json({ message: "user created successfully", token, newUser })

  } catch (error) {
    console.error(error); // Log the actual error for debugging
    res.status(500).json({ error: "Internal server error" }); // Send an error response
  }
}



exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if(email === "" || password === ""){
      return res.status(401).json({ error: "All input fields require" })
    }

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" })
    }
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" })
    }

    //issue token 
    const token = jwt.sign({ username: user.username }, secret, {
      expiresIn: "1h"
    })

    res.status(201).json({ message: "user logged in successfully", token })

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in' });
  }
}