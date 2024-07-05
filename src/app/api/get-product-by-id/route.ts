import ProductModel from "@/model/Product.model";

export async function GET(request: Request) {
    try {
        const { productId } = await request.json();
        const product = await ProductModel
            .findOne({ _id: productId });

        if (!product) {
            return Response.json({
                status: 404,
                body: { message: 'Product not found' }
            });
        }

        return Response.json({
            status: 200,
            body: { product }
        });
    }
    catch (error) {
        return Response.json({
            status: 500,
            body: { message: 'Internal server error' }
        });
    }
}