const express = require("express")
const router = express.Router();
const {registerUser, loginUser, getAllUsers} = require("../controllers/userController")
const authorizeUser = require("../middleware/authMiddleware")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/users", authorizeUser, getAllUsers)


module.exports = router;