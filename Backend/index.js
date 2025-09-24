const express=require("express")
const {PrismaClient}=require("./generated/prisma")
const notesRouter=require("./routes/notesRoutes")
const authRoutes=require("./routes/authRoutes")


const app=express()
app.get("/health",(req,res)=>{
    res.status("ok")
})
app.use("/notes",notesRouter)
app.use("/auth",authRoutes)

app.listen(process.env.PORT ||3000,()=>{
    console.log(`Server is running at ${process.env.PORT}`)
})