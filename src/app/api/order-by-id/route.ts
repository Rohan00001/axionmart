// import { NextApiRequest, NextApiResponse } from 'next';
// import dbConnect from '@/lib/dbConnect';
// import OrderModel from '@/model/Order.model';

// export default async function (request: Request) {
//     await dbConnect();

//     try {
//         const { id } = new URL(request.url);
//         if (typeof id !== 'string') {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid order ID provided',
//             });
//         }

//         const order = await OrderModel.findById(id);

//         if (!order) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Order not found',
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: 'Order fetched successfully',
//             order,
//         });
//     } catch (error) {
//         console.error('Error fetching order:', error);
//         return res.status(500).json({
//             success: false,
//             message: 'Error fetching order',
//         });
//     }
// }
