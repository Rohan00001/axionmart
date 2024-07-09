import { z } from "zod";

export const createProductSchema = z.object({
    productName: z.string().min(2, {
        message: "Product name must be at least 2 characters.",
    }),
    productPrice: z.string().min(2, {
        message: "Product price must be at greater then 50.",
    }).
        regex(/^[0-9]*\.?[0-9]+$/, {
            message: "Product price must be a number.",
        })
    ,
    productDescription: z.string().min(10, {
        message: "Product description must be at least 10 characters.",
    }),
    productImage: z.string().url({
        message: "Product image must be a valid URL.",
    }),
    productCategory: z.string().min(2, {
        message: "Product category must be at least 2 characters.",
    }),
})
