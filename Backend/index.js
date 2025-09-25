const express=require("express")
const {PrismaClient}=require("@prisma/client")
const notesRouter=require("./routes/notesRoutes")
const authRoutes=require("./routes/authRoutes")


const app=express()

app.use(express.json())
app.get("/health",(req,res)=>{
    res.send("ok")
})
app.use("/notes",notesRouter)
app.use("/auth",authRoutes)

app.listen(process.env.PORT ||3000,()=>{
    console.log(`Server is running at ${process.env.PORT}`)
})