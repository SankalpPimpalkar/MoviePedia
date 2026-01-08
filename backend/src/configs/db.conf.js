import mongoose from "mongoose";
import { ENV } from "./env.conf.js";

export default async function connectDB() {
    try {
        const response = await mongoose.connect(ENV.DB_URL, { dbName: 'moviepedia' })
        console.log(`✅ Connected to MongoDB: ${response.connection.host}`)
    } catch (error) {
        console.error("❌ MongoDB Connection Error", error)
        process.exit(1)
    }
}