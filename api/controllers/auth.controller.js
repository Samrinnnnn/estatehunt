import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to database
        const newUser = await prisma.user.create({
            data: { username, email, password: hashedPassword },
        });

        // Log new user and send response
        console.log("New user created:", newUser);
        return res.status(201).json({ message: "User registered successfully!", user: newUser });
    } catch (error) {
        console.error("Error in register:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
