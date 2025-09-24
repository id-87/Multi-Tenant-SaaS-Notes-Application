const express=require("express")
const {PrismaClient}=require("./generated/prisma")


const app=express()



app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server is running at ${process.env.PORT}`)
})