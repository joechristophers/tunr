import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'
import prisma from "@/lib/prisma";
import { generateToken } from "@/lib/auth";
import cookie from "cookie";


export default async function handler(req, res){
    if (req.method == "POST"){
        const {username, password} = req.body
        if (!username || !password) {
          return res
            .status(400)
            .json({ message: "Username and password are required" });
        }

        const user = await prisma.user.findUnique({where: {username: username}})

        if (!user){
            return res.status(404).json({message: `User with this username ${username} was not found`})
        }
        const checkedPassword =  await bcrypt.compare(password, user.password)
        if (checkedPassword){
            const token = generateToken(user)
            res.setHeader("Set-Cookie", cookie.serialize("accessToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV == "production",
                sameSite: "strict",
                path: '/'
            }))
            return res.status(200).json(token);
       
       
       }else{
            return res.status(401).json({message: "invalid credentials"})
        }


    }else{
        res.status(405).json({message: "method not allowed"})
    }


}
