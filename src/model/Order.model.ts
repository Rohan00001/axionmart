import mongoose, { Document, Schema } from "mongoose";

export interface Order extends Document {
    orderItems: string[];
    shippingAddress: string;
    paymentMethod: string;
    itemPrice: number;
    shippingPrice: number;
    totalPrice: number;
    orderStatus: string;
    paidAt: Date;
    deliveredAt?: Date;
    user: mongoose.Schema.Types.ObjectId;
}

const OrderSchema: Schema<Order> = new mongoose.Schema({
    orderItems: {
        type: [String],
        required: true,
    },
    shippingAddress: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    itemPrice: {
        type: Number,
        required: true,
    },
    shippingPrice: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    orderStatus: {
        type: String,
        required: true,
    },
    paidAt: {
        type: Date,
        required: true,
    },
    deliveredAt: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const OrderModel = mongoose.models.Order as mongoose.Model<Order>
    || mongoose.model<Order>("Order", OrderSchema);

export default OrderModel;