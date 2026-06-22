import z from "zod";
import { products } from "../model";

export type ProductInferInsert = typeof products.$inferInsert

export const productCreateSchema = z.object({
    name: z.string().max(200) ,
    category: z.string().max(200) ,
    price: z.number(),
    // created_at: z.date(),
    // updated_at: z.date(),
    // is_deleted: z.boolean().optional(),
 }) satisfies z.ZodType<ProductInferInsert>

 export type ProductCrete = z.ZodType <typeof productCreateSchema>