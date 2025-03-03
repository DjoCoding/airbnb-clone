import mongoose from "mongoose";
import { hash } from "../../utils/hash"

export interface IUser extends mongoose.Document<string> {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
    firstname: {
        type: String, 
        trim: true,
        required: true
    }, 
    lastname: {
        type: String, 
        trim: true,
        required: true
    }, 
    email: {
        type: String, 
        trim: true,
        required: true, 
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) { return next(); }
    const password = await hash(this.password);
    this.password = password;
})

const User = mongoose.model<IUser>("User", userSchema);
export default User;