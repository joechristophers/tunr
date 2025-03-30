import prisma from "@/lib/prisma";
import publicView from "@/schemas/publicView"
export default async function handler(req, res){
    if (req.method == "GET"){
    const users = await prisma.user.findMany({
      select: publicView,
    });
    return res.status(200).json(users)
    }else if(req.method == 'POST'){
        const new_user = await prisma.user.create({
            data: req.body
        })
        return res.status(200).json(new_user)

    }
    else{
        res.status(400).json({error: 'Method not allowed'})
    }

}
