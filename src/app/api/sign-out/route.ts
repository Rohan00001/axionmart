import { cookies } from "next/headers";

export async function POST(request: Request) {

    try {
        cookies().set('accessToken', '');
        return Response.json(
            {
                success: true,
                message: 'User signed out successfully',
            },
            { status: 200 }
        );
    }
    catch (error) {
        return Response.json(
            {
                success: false,
                message: 'Internal server error',
            },
            { status: 500 }
        );
    }
}