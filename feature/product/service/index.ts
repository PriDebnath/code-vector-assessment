import { db } from "@/lib/database/connection"
import { table } from "@/lib/database/model"


export const getProducts = async (param: {}) => {
    const products = await db.select().from(table.products)
    return products
}
