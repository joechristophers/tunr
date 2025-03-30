import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { username, email, password } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
    

    if (existingUser) {
      return res.status(409).json({ message: "This user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword, 
      },
    });

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("An error occurred while creating a new user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
