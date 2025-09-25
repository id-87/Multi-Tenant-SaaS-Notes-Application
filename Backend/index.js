const express=require("express")
const {PrismaClient}=require("@prisma/client")
const notesRouter=require("./routes/notesRoutes")
const authRoutes=require("./routes/authRoutes")
const cors = require("cors")

const app=express()

app.use(express.json())


const allowedOrigins = ['https://multi-tenant-saa-s-notes-applicatio-lovat-two.vercel.app/'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));


// app.use(cors({
//     origin : "*",
//     methods : ["GET","POST","PUT","DELETE"],
    
// }))


app.get("/health",(req,res)=>{
    res.send("ok")
})
app.use("/notes",notesRouter)
app.use("/auth",authRoutes)

app.listen(process.env.PORT ||3000,()=>{
    console.log(`Server is running at ${process.env.PORT}`)
})
