import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const generateAccessToken = async (username: string): Promise<any> => {
    try {
        const accessToken: string = jwt.sign(
            { username },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );

        return {
            success: true,
            accessToken,
            status: 200
        };

    } catch (error) {
        console.error('Error generating access token:', error);
        return {
            success: false,
            message: 'Internal server error',
            status: 500
        };
    }
};

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, password } = await request.json();

        const existingUser = await UserModel.findOne({ username });

        if (!existingUser) {
            return Response.json(
                {
                    success: false,
                    message: 'User not found',
                },
                { status: 404 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return Response.json(
                {
                    success: false,
                    message: 'Invalid password',
                },
                { status: 401 }
            );
        }

        const { success, accessToken, status } = await generateAccessToken(username);

        if (!success) {
            return Response.json(
                {
                    success: false,
                    message: 'Internal server error',
                },
                { status: 500 }
            );
        }

        cookies().set('accessToken', accessToken);
        return Response.json(
            {
                success: true,
                message: 'User signed in successfully',
                accessToken,
            },
            { status }
        );
    }
    catch (error) {
        console.error('Error signing in:', error);
        return Response.json(
            {
                success: false,
                message: 'Internal server error',
            },
            { status: 500 }
        );
    }
}
