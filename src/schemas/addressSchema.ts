import { z } from "zod";

const addressSchema = z.object({
    street: z.string().min(5, { message: "Street name must be at least 5 characters." }),
    landMark: z.string().min(5, { message: "Landmark must be at least 5 characters." }),
    city: z.string().min(2, { message: "City must be at least 2 characters." }),
    state: z.string().min(2, { message: "State must be at least 2 characters." }),
    pincode: z.string().min(5, { message: "Pincode must be at least 5 characters." })

});

export default addressSchema;