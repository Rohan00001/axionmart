import ProductModel from "@/model/Product.model";

export async function POST(request: Request) {
    try {
        const {
            productName,
            productPrice,
            productDescription,
            productImage,
            productCategory,
            listedBy,
        } = await request.json();

        const newProduct = new ProductModel({
            productName,
            productPrice,
            productDescription,
            productImage,
            productCategory,
            listedBy,
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