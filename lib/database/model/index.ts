import { products } from "@/feature/product/model";

export const table = {
    products,
} as const

export type Table = typeof table

export { 
    products 
}  // drizzle look at it to maintain migration