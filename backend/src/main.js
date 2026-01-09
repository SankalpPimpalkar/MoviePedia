import express from "express";
import { ENV } from "./configs/env.conf.js";
import path from "path"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./configs/db.conf.js";
import userRouter from "./routes/user.routes.js";
import movieRouter from "./routes/movie.routes.js";

const app = express()
const __dirname = path.resolve()

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
}));


// Routes
app.get("/api/system", (req, res) => {
    return res.status(200).json({ message: "System is running" })
})
app.use('/api/users', userRouter)
app.use('/api/movies', movieRouter)



if (ENV.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("/{*any}", (req, res) => {
        return res
            .sendFile(path.join(__dirname, "../client", "dist", "index.html"))
    })
}

app.listen(ENV.PORT, () => {
    console.log("✅ Server is up and running on port", ENV.PORT)
    connectDB()
})