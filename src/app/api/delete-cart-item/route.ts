import CartModel from "@/model/Cart.model";
import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function DELETE(request: NextApiRequest, response: NextApiResponse) {
    await dbConnect();
    console.log("Before try");
    try {
        const { data } = request.body;
        const cartId = data.cartId;

        // Handle deletion based on cartId
        const cart = await CartModel.findByIdAndDelete(cartId);

        if (!cart) {
            return response.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        return response.status(200).json({
            success: true,
            body: cart
        });
    }
    catch (error) {
        console.error("Error:", error);
        return response.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}
