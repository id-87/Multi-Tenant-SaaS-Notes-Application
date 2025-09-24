const express=require("express")
const router=express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {PrismaClient}=require("../generated/prisma")
const prisma=new PrismaClient()
const jwt=require("jsonwebtoken")

router.post("/signup",async(req,res)=>{
    const{email,password,role}=req.body
    const temp=await prisma.user.findFirst({where:
        {email:email}
    })
    if (temp){
        return res.send(400).send("User already exists")
    }



    
    bcrypt.hash(password, salt,async function(err, hash) {
        await prisma.user.create({
            data:{
                email:email,
                password:hash,
                role:role
            }
        })
    });

res.status(200).send("User created successfully now please complete the profile")

})


router.post("/subs",async(req,res)=>{
    const{tenantId,sub}=req.body
    const entry=await prisma.tenant.updateOne({where:{
        id:tenantId
    },data:{

        subscription:sub
    }})
})


router.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const entry=await prisma.user.findFirst({
        where:{email:email}
    })
    const hash=entry.password

    bcrypt.compare(password, hash, function(err, result) {
    if(password===hash){
        const token=jwt.sign({email:email},"ver")
        res.cookie("token",token)
    }
    //for verification use jwt.verify(req.cookies.token,"ver")
});

})


module.exports=router