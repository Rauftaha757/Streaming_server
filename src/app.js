const express=require('express')
const app=express()

app.use(express.json({ limit : "16kb"}))
app.use(express.urlencoded({extended:true, limit :"16kb"}))
app.use(express.static("public"));



// routes
const userRouter = require("./routes/userRoutes.js")
app.use("/api",userRouter)

module.exports = app;

