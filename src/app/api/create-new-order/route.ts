import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/model/Order.model";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { itemId, orderItem, shippingAddress, paymentMethod, itemPrice, shippingPrice, totalPrice, orderStatus, paidAt, deliveredAt, user } = await request.json();
        console.log(itemId, orderItem, shippingAddress, paymentMethod, itemPrice, shippingPrice, totalPrice, orderStatus, paidAt, deliveredAt, user)

        const order = new OrderModel({
            itemId,
            orderItem,
            shippingAddress,
            paymentMethod,
            itemPrice,
            shippingPrice,
            totalPrice,
            orderStatus,
            paidAt,
            deliveredAt,
            user,
        });

        await order.save();

        const createdOrder = await OrderModel.findOne({ itemId });

        if (!order) {
            return new Response(JSON.stringify({
                success: false,
                message: "Error registering order"
            }), { status: 500 })
        }

        return new Response(JSON.stringify({
            success: true,
            message: "Order registered successfully",
            order: createdOrder
        }), { status: 200 })

    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            message: "Error while registering order"
        }), { status: 500 })
    }
}