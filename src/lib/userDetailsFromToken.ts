import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface UserDetails {
    _id: string;
    [key: string]: any;
}

export const userDetailsFromToken = async (): Promise<UserDetails | null> => {
    const cookieStore = cookies();
    try {
        const accessTokenCookie = cookieStore.get('accessToken');

        if (!accessTokenCookie) {
            return null;
        }

        const accessToken = accessTokenCookie.value;

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as jwt.JwtPayload & UserDetails;

        if (decodedToken && decodedToken._id) {
            return decodedToken;
        } else {
            return null;
        }
    } catch (error) {
        console.log('Error verifying token:', error);
        return null;
    }
}
