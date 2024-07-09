import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/model/Product.model";


export async function GET(request: Request) {
    await dbConnect();
    try {
        const products = await ProductModel.find();
        if (!products) {
            return new Response(JSON.stringify({
                success: false,
                message: "No products found"
            }), { status: 404 });
        }
        return new Response(JSON.stringify({
            success: true,
            message: "Products fetched successfully",
            products
        }), { status: 200 }
        );

    }
    catch (error) {
        return Response.json({
            status: 500,
            body: { message: 'Internal server error' }
        });
    }
}