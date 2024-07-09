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
            return new Response(JSON.stringify({
                success: false,
                message: "Unauthorized"
            }), { status: 401 });
        }

        const newProduct = new ProductModel({
            productName,
            productPrice,
            productDescription,
            listedBy: userDetails?._id || '',
            productImage,
            productCategory,
            listedOn: new Date(),
            productStatus: 'Available',
            productRating: 0,
            reviews: [],
        });

        await newProduct.save();

        return new Response(JSON.stringify({
            success: true,
            message: "Product created successfully",
            product: newProduct
        }), { status: 200 });
    }
    catch (error) {
        console.log(error);
        return new Response(JSON.stringify({
            success: false,
            message: "Internal server error"
        }), { status: 500 });
    }
}