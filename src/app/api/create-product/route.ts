import dbConnect from "@/lib/dbConnect";
import { userDetailsFromToken } from "@/lib/userDetailsFromToken";
import ProductModel from "@/model/Product.model";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const userDetails = await userDetailsFromToken();

        const {
            productName,
            productPrice,
            productDescription,
            productImage,
            productCategory,
        } = await request.json();

        if (!userDetails) {
            return Response.json({
                status: 401,
                body: { message: 'Unauthorized please login first' }
            });
        }

        const newProduct = new ProductModel({
            productName,
            productPrice,
            productDescription,
            productImage,
            productCategory,
            listedBy: userDetails?._id || '',
            productRating: 0,
            reviews: [],
        });

        await newProduct.save();

        return Response.json({
            status: 201,
            body: { message: 'Product created successfully' }
        });
    }
    catch (error) {
        return Response.json({
            status: 500,
            body: { message: 'Internal server error' }
        });
    }
}