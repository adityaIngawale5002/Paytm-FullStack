const express = require("express");
const {mainRouter}=require("./router/index.js")
const app=express();
const mongoose=require("mongoose")
const cors=require("cors")

 const dbconnect=async()=> { await mongoose.connect("")}
 try {
    dbconnect().then((response)=>{
        console.log(response,"db running")
    })
    
    
 } catch (error) {
    console.log(error)
    throw error
 }
app.use(cors());
app.use(express.json());


app.use("/api/v1",mainRouter)
 
app.listen(7000,()=>{
    console.log("server runing at localhost:7000")
})


