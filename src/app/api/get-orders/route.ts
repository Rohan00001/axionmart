import OrderModel from "@/model/Order.model";
import dbConnect from "@/lib/dbConnect";
import { userDetailsFromToken } from "@/lib/userDetailsFromToken";
import mongoose from "mongoose";
import ProductModel from "@/model/Product.model"; // Ensure you have the Product model

export async function GET(req: Request) {
    await dbConnect();
    try {
        const userDetails = await userDetailsFromToken();

        if (!userDetails) {
            return new Response(JSON.stringify({
                success: false,
                message: "User not authenticated"
            }), { status: 401 });
        }

        const orders = await OrderModel.aggregate([
            {
                $match: {
                    orderBy: new mongoose.Types.ObjectId(userDetails._id)
                }
            },
            {
                $unwind: '$items'
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'items.itemId',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            {
                $unwind: '$productDetails'
            },
            {
                $group: {
                    _id: '$_id',
                    items: {
                        $push: {
                            _id: '$items.itemId',
                            name: '$productDetails.name',
                            quantity: '$items.quantity',
                            itemPrice: '$items.itemPrice',
                            shippingPrice: '$items.shippingPrice',
                            totalPrice: '$items.totalPrice',
                            productDetails: '$productDetails'
                        }
                    },
                    shippingAddress: { $first: '$shippingAddress' },
                    paymentMethod: { $first: '$paymentMethod' },
                    totalPrice: { $first: '$totalPrice' },
                    orderStatus: { $first: '$orderStatus' },
                    paidAt: { $first: '$paidAt' },
                    deliveredAt: { $first: '$deliveredAt' },
                    orderBy: { $first: '$orderBy' },
                }
            }
        ]);

        if (orders.length === 0) {
            return new Response(JSON.stringify({
                success: false,
                message: "No orders found"
            }), { status: 404 });
        }

        return new Response(JSON.stringify({
            success: true,
            message: "Orders fetched successfully",
            orders: orders,
        }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({
            success: false,
            message: "Internal server error"
        }), { status: 500 });
    }
}
0