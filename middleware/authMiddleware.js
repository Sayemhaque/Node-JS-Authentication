const jwt = require("jsonwebtoken")
require("dotenv").config()
const secret = process.env.JWT_SECRET

const authorizeUser = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" })
        }

        //verifyJwt
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Unauthorized" })
            }

            req.user = decoded
            next()
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = authorizeUser