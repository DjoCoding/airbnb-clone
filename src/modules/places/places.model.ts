import mongoose from "mongoose";

export interface IPlace extends mongoose.Document<string> {
    ownerID: string;
    title:string;
    description: string;
    pictures: string[];
    price: number;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const placeSchema = new mongoose.Schema<IPlace>({
    ownerID: {
        type: String,
        ref: "User",
        required: true
    },
    title: {
        type: String, 
        required: true,
    },
    description: {
        type: String
    },
    pictures: {
        type: [String]
    },
    price: { 
        type: Number,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
        required: true,
    }
}, {
    timestamps: true,
})

const Place = mongoose.model<IPlace>("Place", placeSchema);
export default Place;