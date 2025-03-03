"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const placeSchema = new mongoose_1.default.Schema({
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
});
const Place = mongoose_1.default.model("Place", placeSchema);
exports.default = Place;
