const express = require("express")
const { connection } = require("./db")
const {UserRouter} = require("./Routes/User.Route")
const {PostRouter} = require("./Routes/Post.Route")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())
require("dotenv").config()

app.use("/users", UserRouter)
app.use("/posts", PostRouter)


const PORT = process.env.PORT

app.listen(PORT, async()=>{
try{
    await connection
    console.log('Connected to DB')
     console.log(`Server is Running at Port Number ${PORT}`)
}catch(err){
    console.log(err)
}
})