import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, password } = await request.json();
        console.log(username, email, password)

        const existingUserByUsername = await UserModel.findOne({ username });

        if (existingUserByUsername) {
            return Response.json({
                status: 409,
                body: { message: 'Username already exists' }
            });
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
            return Response.json(
                {
                    success: false,
                    message: 'User Creation failed',
                },
                { status: 500 }
            );
        }

        return Response.json(
            {
                success: true,
                message: 'User registered successfully',
                user: createdUser,
            },
            { status: 201 }
        );

    } catch (error) {
        return Response.json(
            {
                success: false,
                message: 'Error registering user',
                error,
            },
            { status: 500 }
        );
    }

}