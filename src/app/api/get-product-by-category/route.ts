import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/model/Product.model';

export async function GET(request: Request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");

        console.log('category:', category);

        if (!category) {
            return new Response(JSON.stringify({
                success: false,
                message: "Category is required"
            }), { status: 400 });
        }

        const products = await ProductModel.aggregate([
            {
                $match: {
                    productCategory: category,
                },
            },
        ]);

        return new Response(JSON.stringify({
            success: true,
            message: "Products fetched successfully",
            products: products
        }), { status: 200 });
    } catch (error) {
        console.error('Error while fetching orders:', error);
        return new Response(JSON.stringify({
            success: false,
            message: "Error while fetching orders"
        }), { status: 500 });
    }
}
