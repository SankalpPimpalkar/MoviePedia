import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ENV } from "../configs/env.conf.js";
import bcrypt from "bcrypt";

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
}

function createCookie(res, user) {
    const token = jwt.sign(
        {
            userId: user._id,
            isAdmin: user.isAdmin
        },
        ENV.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("token", token, COOKIE_OPTIONS);
    return
}

export async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ message: "All fields are required (name, email, password)" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User already exists" });
        }

        const newUser = await User.create({
            name,
            email,
            password
        });

        createCookie(res, newUser)

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin
            }
        });

    } catch (error) {
        console.error("Error in Registering User:", error);
        return res
            .status(500)
            .json({ message: "Internal Server Error" });
    }
}

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        createCookie(res, user);

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });

    } catch (error) {
        console.error("Error in Login User:", error);
        return res
            .status(500)
            .json({ message: "Internal Server Error" });
    }
}

export async function getUser(req, res) {
    try {
        if (!req.user) {
            return res
                .status(401)
                .json({ message: "Unauthorized" });
        }

        return res.status(200).json({
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                isAdmin: req.user.isAdmin
            }
        });

    } catch (error) {
        console.error("Error in Get User:", error);
        return res
            .status(500)
            .json({ message: "Internal Server Error" });
    }
}

export async function logoutUser(req, res) {
    try {
        res.clearCookie("token", COOKIE_OPTIONS);

        return res.status(200).json({
            message: "Logout successful"
        });

    } catch (error) {
        console.error("Error in Logout User:", error);
        return res
            .status(500)
            .json({ message: "Internal Server Error" });
    }
}
