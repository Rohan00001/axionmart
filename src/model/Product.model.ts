import mongoose, { Document, Schema } from "mongoose";

export interface Product extends Document {
    productName: string;
    productPrice: number;
    productDescription: string;
    listedBy: mongoose.Schema.Types.ObjectId;
    productImage: string;
    productCategory: string;
    listedOn: Date;
    productStatus: string;
    productRating?: number;
    reviews?: string[];
}

const ProductSchema: Schema<Product> = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    listedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    productCategory: {
        type: String,
        required: true,
    },
    listedOn: {
        type: Date,
        default: Date.now,
    },
    productStatus: {
        type: String,
        default: "Available",
        enum: ["Available", "Sold Out"]
    },
    productRating: {
        type: Number,

    },
    reviews: {
        type: [String],
    },
});

const ProductModel = mongoose.models.Product as mongoose.Model<Product>
    || mongoose.model<Product>("Product", ProductSchema);

export default ProductModel;
