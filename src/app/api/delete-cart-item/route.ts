import CartModel from "@/model/Cart.model";
import dbConnect from "@/lib/dbConnect";

export async function DELETE(request: Request) {
    await dbConnect();

    try {
        const { cartId } = await request.json();

        const cart = await CartModel.findByIdAndDelete(cartId);

        if (!cart) {
            return new Response(JSON.stringify({
                success: false,
                message: "Cart item not found",
            }), {
                status: 404,
            });
        }

        return new Response(JSON.stringify({
            success: true,
            message: "Cart item deleted successfully",
        }), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            message: "Internal server error",
        }), {
            status: 500,
        });
    }
}
