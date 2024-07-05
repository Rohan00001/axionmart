import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/model/Order.model';

export default async function getOrderById(req: NextApiRequest) {
    await dbConnect();

    try {
        const { id } = req.query;
        if (typeof id !== 'string') {
            return Response.json(
                {
                    success: false,
                    message: 'Invalid order ID provided',
                },
                { status: 500 }
            );
        }

        const order = await OrderModel.findById(id);

        if (!order) {
            return Response.json(
                {
                    success: false,
                    message: 'Order not found',
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                message: 'Order fetched successfully',
                order,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching order:', error);
        return Response.json(
            {
                success: false,
                message: 'Error fetching order',
            },
            { status: 500 }
        );
    }
}
