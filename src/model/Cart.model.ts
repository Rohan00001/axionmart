import mongoose, { Document, Schema } from "mongoose";

export interface Cart extends Document {
    productId: mongoose.Schema.Types.ObjectId;
    productName: string;
    productPrice: number;
    productImage: string;
    productQty: number;
    user: mongoose.Schema.Types.ObjectId;
}

const CartSchema: Schema<Cart> = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
    },
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    productQty: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
});

const CartModel = mongoose.models.Order as mongoose.Model<Cart>
    || mongoose.model<Cart>("Cart", CartSchema);

export default CartModel;