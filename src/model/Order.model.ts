import mongoose, { Document, Schema } from "mongoose";

export interface Order extends Document {
    items: {
        itemId: mongoose.Schema.Types.ObjectId;
        quantity: number;
        itemPrice: number;
        shippingPrice: number;
        totalPrice: number;
    }[];
    shippingAddress: string;
    paymentMethod: string;
    totalPrice: number;
    orderStatus: string;
    paidAt: Date;
    deliveredAt?: Date;
    orderBy: mongoose.Schema.Types.ObjectId;
}

const ItemSchema: Schema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    itemPrice: {
        type: Number,
        required: true,
    },
    shippingPrice: {
        type: Number,
        default: 50.00,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
});

const OrderSchema: Schema<Order> = new mongoose.Schema({
    items: [ItemSchema],
    shippingAddress: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        default: 0,
    },
    orderStatus: {
        type: String,
        default: "Pending",
    },
    paidAt: {
        type: Date,

    },
    deliveredAt: {
        type: Date,
    },
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

// Middleware to calculate total price for each item before saving the order
OrderSchema.pre('save', function (next) {
    this.items.forEach(item => {
        item.totalPrice = item.itemPrice * item.quantity + item.shippingPrice;
    });

    // Calculate total price for the entire order
    this.totalPrice = this.items.reduce((acc, item) => acc + item.totalPrice, 0);
    next();
});

const OrderModel = mongoose.models.Order as mongoose.Model<Order> || mongoose.model<Order>("Order", OrderSchema);

export default OrderModel;
