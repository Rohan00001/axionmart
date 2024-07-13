import OrderModel, { Order } from "@/model/Order.model";
import { userDetailsFromToken } from "@/lib/userDetailsFromToken";
import dbConnect from "@/lib/dbConnect";
import CartModel from "@/model/Cart.model";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const data = await request.json();
        const userDetails = await userDetailsFromToken();
        if (!userDetails) {
            return new Response(JSON.stringify({
                success: false,
                message: "Unauthorized"
            }), { status: 401 });
        }

        const { carts, address } = data;

        const formattedItems = carts?.map((item: any) => ({
            itemId: item.productId,
            quantity: item.productQty,
            itemPrice: item.productPrice.toString(),
            shippingPrice: "50.00", // Example shipping price as a string
            totalPrice: (item.productPrice * item.productQty + 50.00).toFixed(2), // Example calculation
        }));

        const newOrder = new OrderModel({
            items: formattedItems,
            shippingAddress: address,
            paymentMethod: "Online",
            orderStatus: "Pending",
            paidAt: new Date(),
            orderBy: userDetails?._id || '',
        });

        await newOrder.save();

        // Clear the cart after creating the order

        await CartModel.deleteMany({ user: userDetails?._id });


        return new Response(JSON.stringify({
            success: true,
            message: "Order created successfully",
        }), { status: 200 });
    }
    catch (error) {
        console.log(error);
        return new Response(JSON.stringify({
            success: false,
            message: "Internal server error"
        }), { status: 500 });
    }
}
