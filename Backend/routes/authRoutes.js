const express=require("express")
const router=express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {PrismaClient}=require("@prisma/client")
const prisma=new PrismaClient()
const jwt=require("jsonwebtoken")
router.use(express.json())
router.post("/signup",async(req,res)=>{
    const{email,password,role,tenantId}=req.body
    const temp=await prisma.user.findFirst({where:
        {email:email}
    })
    if (temp){
        res.send(400).send("User already exists")
    }



    
    bcrypt.hash(password, saltRounds,async function(err, hash) {
        await prisma.user.create({
            data:{
                email:email,
                password:hash,
                role:role
            }
        })
    });

res.status(200).send("User created successfully")

})


router.post("/subs",async(req,res)=>{
    const{tenantId,sub}=req.body
    const entry=await prisma.tenant.updateOne({where:{
        id:tenantId
    },data:{

        subscription:sub
    }})
    res.send("subs fetched")
})


router.post("/login",async(req,res)=>{
    // console.log(req);
    
    
    
    
    const {email,password}=req.body
    const entry=await prisma.user.findFirst({
        where:{email:email}
    })

    // console.log(entry);
    
    const hash=entry.password

    bcrypt.compare(password, hash, function(err, result) {
    if(password===hash){
        const token=jwt.sign({email:email},"ver")
        res.cookie("token",token)
    }
    // for verification use jwt.verify(req.cookies.token,"ver")

    res.send("OK")
});
})

module.exports=router


