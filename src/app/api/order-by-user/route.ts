import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/model/Order.model";
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(request: NextApiRequest,) {
    await dbConnect();

    try {
        const { user } = request.query;
        console.log(user);

        const orders = await OrderModel.find({ user });

        if (!orders) {
            return Response.json(
                {
                    success: false,
                    message: 'No orders found',
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                message: 'Orders fetched successfully',
                orders,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching orders:', error);
        return Response.json(
            {
                success: false,
                message: 'Error fetching orders',
            },
            { status: 500 }
        );
    }
}