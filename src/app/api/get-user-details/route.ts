import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";

export async function GET(request: Request) {
    await dbConnect();

    try {
        const { username } = await request.json();
        const user = await UserModel
            .findOne({ username })
            .select('-password');

        if (!user) {
            return Response.json({
                status: 404,
                body: { message: 'User not found' }
            });
        }

        return Response.json({
            status: 200,
            body: { user }
        });
    }
    catch (error) {
        return Response.json({
            status: 500,
            body: { message: 'Internal server error' }
        });
    }
}