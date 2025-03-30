import prisma from "@/lib/prisma";
import privateView from "@/schemas/privateView";

export default async function handler(req, res){
    const {id} = req.query;
    try{

    if (req.method == 'GET'){
        const user = await prisma.user.findUnique({
          where: { id: id },
          select: privateView,
        });
        console.log("Fetching user with ID:", id);
        if (!user){
          return  res.status(404).json({message: "User not found"})
        }
       return res.status(200).json(user)
    }else if(req.method == "PUT") {

        const updatedUser = await prisma.user.update({where: {id: id}, data: req.body})
        return res.status(200).json(updatedUser)
    }
    else if(req.method == "DELETE"){
        const deleteUser = await prisma.user.delete({where: {id: id}})
        return res.status(200).json({message: "user was deleted successfully"})

    }else{
        res.status(405).json({message: "Method Not Allowed"})
    }
    }catch(error){
        console.log('there was an error', error)
        return res.status(400).json({message: `There was an unexpected error  ${error}`})
    }


}
