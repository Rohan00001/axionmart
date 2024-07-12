import CartModel from '@/model/Cart.model';
import dbConnect from "@/lib/dbConnect";
import { userDetailsFromToken } from '@/lib/userDetailsFromToken';
import mongoose from 'mongoose';

export async function GET(request: Request) {
    await dbConnect();
    try {
        const userData = await userDetailsFromToken();
        if (!userData) {
            return new Response(JSON.stringify({
                success: false,
                message: 'User not found'
            }), {
                status: 404,
            });
        }

        const products = await CartModel.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(userData._id)
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                $unwind: '$product'
            },
        ]);

        if (!products) {
            return new Response(JSON.stringify({
                success: false,
                message: 'Product not found'
            }), {
                status: 404,

            });
        }

        return new Response(JSON.stringify({
            success: true,
            body: products
        }), {
            status: 200,
        });
    }
    catch (error) {
        return new Response(JSON.stringify({
            success: false,
            message: 'Internal server error'
        }), {
            status: 500,
        });
    }
}