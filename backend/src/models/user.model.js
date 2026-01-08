import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

userSchema.pre("save", async function () {
    try {
        if (!this.isModified("password")) return

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);

        this.password = hashedPassword;
    } catch (err) {
        throw new Error(err)
    }
});

const User = mongoose.model('User', userSchema)
export default User