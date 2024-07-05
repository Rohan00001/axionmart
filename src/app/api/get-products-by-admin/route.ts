import ProductModel from "@/model/Product.model";

export async function GET(request: Request) {
    try {
        const { adminId } = await request.json();
        const products = await ProductModel.find({ listedBy: adminId });
        return Response.json({
            status: 200,
            body: { products }
        });
    }
    catch (error) {
        return Response.json({
            status: 500,
            body: { message: 'Internal server error' }
        });
    }
}