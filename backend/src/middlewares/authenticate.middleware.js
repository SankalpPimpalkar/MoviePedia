import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ENV } from "../configs/env.conf.js";

export default async function authenticate(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res
                .status(401)
                .json({ message: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, ENV.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res
                .status(401)
                .json({ message: "Unauthorized: User not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("Authenticate Middleware Error:", error);
        return res
            .status(401)
            .json({ message: "Unauthorized: Invalid or expired token" });
    }
}
