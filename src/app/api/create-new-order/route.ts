// import dbConnect from "@/lib/dbConnect";
// import OrderModel from "@/model/Order.model";

// export async function POST(request: Request) {
//     await dbConnect();

//     try {
//         const { itemId, orderItem, shippingAddress, paymentMethod, itemPrice, shippingPrice, totalPrice, orderStatus, paidAt, deliveredAt, user } = await request.json();
//         console.log(itemId, orderItem, shippingAddress, paymentMethod, itemPrice, shippingPrice, totalPrice, orderStatus, paidAt, deliveredAt, user)

//         const order = new OrderModel({
//             itemId,
//             orderItem,
//             shippingAddress,
//             paymentMethod,
//             itemPrice,
//             shippingPrice,
//             totalPrice,
//             orderStatus,
//             paidAt,
//             deliveredAt,
//             user,
//         });

//         await order.save();

//         const createdOrder = await OrderModel.findOne({ itemId });

//         if (!order) {
//             return Response.json(
//                 {
//                     success: false,
//                     message: 'Order Creation failed',
//                 },
//                 { status: 500 }
//             );
//         }

//         return Response.json(
//             {
//                 success: true,
//                 message: 'Order registered successfully',
//                 order: createdOrder,
//             },
//             { status: 201 }
//         );

//     } catch (error) {
//         return Response.json(
//             {
//                 success: false,
//                 message: 'Order Creation failed',
//             },
//             { status: 500 }
//         );
//     }
// }