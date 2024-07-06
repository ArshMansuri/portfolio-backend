require('dotenv').config({"path": "./config/config.env"})
const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const cookiParser = require('cookie-parser')
const admin = require("./routes/admin")
const userHomeData = require("./routes/homeData")
const user = require("./routes/user")
const cors = require("cors")


const PORT = process.env.PORT || 4000

//================== MiddelWers =====================================
const corsOptions = {
    origin: true,
    credentials: true, 
};

app.use(cors(corsOptions))
app.use(bodyparser.json({limit: "50mb"}))
app.use(express.json({limit: "50mb"}))
app.use(cookiParser())


//================== Data Base Connection ===========================
const {connectDataBase} = require('./db/conDB')
connectDataBase()


//=================== Routers =======================================
app.use('/api/v1', admin)
app.use('/api/v1', userHomeData)
app.use('/api/v1', user)

app.get("/", (req, res)=>{
    res.send("Arsshhh portfolio")
})

app.listen(PORT, ()=>{
    console.log(`App listen on port ${PORT}`)
})