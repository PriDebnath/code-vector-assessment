import { asc, desc, sql } from "drizzle-orm";
import { table } from "@/lib/database/model"
import { db } from "@/lib/database/connection"
import { Product } from "@/feature/product/schema/index"

type Params = {
    page?: number;
    limit?: number;
    sortBy?: keyof Product;
    order?: "asc" | "desc";
};

export async function getProducts({
    page = 1,
    limit = 10,
    sortBy = "created_at",
    order = "desc",
}: Params) {
    const offset = (page - 1) * limit;

    const orderFn = order === "asc" ? asc : desc;

    const data = await db
        .select()
        .from(table.products)
        .orderBy(orderFn(table.products[sortBy]))
        .limit(limit)
        .offset(offset);

    const [{ count }] = await db.select({
        count: sql<number>`COUNT(*)`
    }).from(table.products);

    return {
        data,
        total: count,
        page,
        limit,
    };
}