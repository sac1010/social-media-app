const express = require("express")
const cors = require('cors')
const app = express()
const db = require("./src/config/db")
const userController = require("./src/controllers/user.controller")
const postsController = require('./src/controllers/posts.controller')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/user', userController)
app.use('/posts', postsController)
app.use("/images", express.static("./images"));


const port = process.env.PORT || 3001



app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
}) 