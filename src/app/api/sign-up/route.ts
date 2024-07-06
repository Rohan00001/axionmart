import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, password } = await request.json();

        const existingUserByUsername = await UserModel.findOne({ username });

        if (existingUserByUsername) {
            console.log(existingUserByUsername);
            return new Response(JSON.stringify({
                success: false,
                message: "Username already taken"
            }), { status: 400 })
        }

        if (password.length < 8) {
            return Response.json({
                status: 400,
                body: { message: 'Password must be at least 8 characters' }
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        const createdUser = await UserModel.findOne({ username }).select('-password');

        if (!user) {
            return new Response(JSON.stringify({
                success: false,
                message: "Error registering user"
            }), { status: 500 })
        }

        return new Response(JSON.stringify({
            success: true,
            message: "User registered successfully",
            user: createdUser
        }), { status: 200 })


    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            message: "Error while registering user"
        }), { status: 500 })
    }

}