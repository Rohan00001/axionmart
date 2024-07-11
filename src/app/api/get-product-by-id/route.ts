import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/model/Product.model";


export async function POST(request: Request) {
    await dbConnect();
    try {
        const { productId } = await request.json();
        console.log(productId);
        const product = await ProductModel
            .findOne({ _id: productId });

        if (!product) {
            return new Response(JSON.stringify({
                success: false,
                message: 'Product not found'
            }), {
                status: 404,

            });
        }

        return new Response(JSON.stringify({
            success: true,
            body: product
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