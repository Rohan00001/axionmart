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
        const { identifier, password } = await request.json();


        const existingUser = await UserModel.findOne({
            $or: [
                { username: identifier },
                { email: identifier }
            ]
        });

        if (!existingUser) {
            return new Response(JSON.stringify({
                success: false,
                message: "User not found"
            }), { status: 404 })
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return new Response(JSON.stringify({
                success: false,
                message: "Invalid password"
            }), { status: 401 })
        }

        const { success, accessToken, status } = await generateAccessToken(identifier);

        if (!success) {
            return new Response(JSON.stringify({
                success: false,
                message: "Error generating access token"
            }), { status: 500 })
        }

        cookies().set('accessToken', accessToken);
        return new Response(JSON.stringify({
            success: true,
            message: "Sign in successful",
        }), { status: status }

        );
    }
    catch (error) {
        console.error('Error signing in:', error);
        return new Response(JSON.stringify({
            success: false,
            message: "Error signing in"
        }), { status: 500 }
        );
    }
}
