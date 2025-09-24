const express=require("express")
const router=express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {PrismaClient}=require("../generated/prisma")
const prisma=new PrismaClient()

router.post("/signup",async(req,res)=>{
    const{email,password}=req.body
    const temp=await prisma.user.findFirst({where:
        {email:email}
    })
    if (temp){
        res.send(400).send("User already exists")
    }



    bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt,async function(err, hash) {
        await prisma.user.create({
            data:{
                email:email,
                password:hash
            }
        })
    });
});
res.status(200).send("User created successfully now please complete the profile")

})


router.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const entry=await prisma.user.findFirst({
        where:{email:email}
    })
    const hash=entry.password

    bcrypt.compare(password, hash, function(err, result) {
    result=true
});

})