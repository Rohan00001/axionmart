import CartModel from '@/model/Cart.model';
import dbConnect from "@/lib/dbConnect";

export async function GET(request: Request) {
    await dbConnect();
    try {
        const products = await CartModel.find()

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