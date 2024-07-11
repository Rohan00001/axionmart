import dbConnect from "@/lib/dbConnect";
import { userDetailsFromToken } from "@/lib/userDetailsFromToken";
import CartModel from "@/model/Cart.model";
import ProductModel from "@/model/Product.model";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { productId } = await request.json();

        // Find the product from the database
        const product = await ProductModel.findOne({ _id: productId });

        if (!product) {
            return new Response(JSON.stringify({
                success: false,
                message: 'Product not found'
            }), {
                status: 404,
            });
        }

        // Get the User details from the token
        const userDetails = await userDetailsFromToken();

        if (!userDetails) {
            return new Response(JSON.stringify({
                success: false,
                message: 'User not found'
            }), {
                status: 404,
            });
        }

        // Create a new cart object
        const cart = new CartModel({
            productId: product._id,
            productName: product.productName,
            productPrice: product.productPrice,
            productImage: product.productImage,
            productQty: 1,
            user: userDetails?._id
        });

        // Save the cart object to the database
        await cart.save();

        // Return a response
        return new Response(JSON.stringify({
            success: true,
            message: 'Product added to cart'
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
