const express = require("express")
const router = express.Router();
const {registerUser, loginUser, userDetails,} = require("../controllers/userController")
const authorizeUser = require("../middleware/authMiddleware")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/user", authorizeUser, userDetails)


module.exports = router;