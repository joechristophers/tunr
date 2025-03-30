import jwt from "jsonwebtoken";
import prisma from "./prisma";
import cookie from 'cookie'

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

export function generateToken(user) {
  const accessToken = jwt.sign(
    { id: user.id, username: user.usernamem, email: user.email },
    ACCESS_SECRET,
    { expiresIn: "1hour" }
  );

  const refreshToken = jwt.sign(
    { id: user.id, username: user.usernamem, email: user.email },
    REFRESH_SECRET,
    { expiresIn: "1hour" }
  );
  return { accessToken, refreshToken};
}


export function verifyToken(req){
    const cookies = cookie.parse(req.headers.cookie || "")
    const token = cookies.accessToken

    if (!token){
        return null
    }
    try{
        return jwt.verify(token, ACCESS_SECRET)

    }catch(err){
        console.log('there was an error verifying token ', err)
        return null
    }

}


export async function getCurrentUSer(req){
    const decoded = verifyToken(req);
    if (!decoded) return null
    return await prisma.user.findUnique({where: {id: decoded.id}})

}
