const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const PORT = process.env.PORT || 3000;
const connectToDatabase = require("./db/dbConnection")
const registerRoute = require("./routes/userRoutes")


//middleware
app.use(express.json())
app.use(cors());

//database connection
connectToDatabase()


app.get("/", (req,res) => {
    res.send("App running")
})

app.use("/", registerRoute)

app.listen(PORT,() => {
    console.log(`App is running in PORT http://localhost:${PORT}`)
})