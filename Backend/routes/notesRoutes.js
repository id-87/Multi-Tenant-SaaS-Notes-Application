const express=require("express")
const router=express.Router()
const {PrismaClient}=require("../generated/prisma")


const prisma = new PrismaClient()


router.post("/",async(req,res)=>{
    

    const {title,content,tenantId,authorId,sub}=req.body
    let notesCount=await prisma.note.count({where:{
        tenantId:tenantId
    }})

    if(sub==="Free"){
        if (notesCount>=3){
            return res.send(404).status("Upgrade to pro for adding more notes")
        }
    }
    const note=await prisma.note.create({
        data:{
            title:title,
            content:content,
            tenantId:tenantId,
            authorId:authorId
        }
    })
    res.send("Note added")


})

router.get("/",async(req,res)=>{

    const ten=te //get this from token somehow
    const data=await prisma.note.findMany({where:{
        tenantId:ten
    }})
    res.status(200).send(data)


})

router.get("/:id",async(req,res)=>{
    const id=Number(req.params.id)
    const data=await prisma.note.findUnique({
        where:{id:id}
    })

    res.status(200).send(data)
})

router.put("/:id",async (req,res)=>{
    const id=Number(req.params.id)
    const body=req.body
    const query=await prisma.note.updateOne({
        where:{id:id},
        data:body
    })
    res.status(200).send(query)
})

router.delete("/:id",async(req,res)=>{
    const id=Number(req.params.id)
    const query=await prisma.note.delete({where:{id:id}})
    res.status(200).send(`Note deleted with id:${id}`)

})

module.exports=router