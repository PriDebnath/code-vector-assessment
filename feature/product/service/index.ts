import { table } from "@/lib/database/model";
import { db } from "@/lib/database/connection"
import { asc, desc, SQL, sql } from "drizzle-orm";
import { Product } from "@/feature/product/schema/index"

type Params = {
    limit?: number;
    cursor?: Product;
    category?: string;
};

export async function getProducts(params: Params) {
    const { limit = 10, cursor, category, } = params
    const conditions: SQL[] = [];
    if (category) {
        conditions.push(sql`${table.products.category} = ${category}`);
    }
    // cursor base on unchangeable fields(created_at, id)
    if (cursor) {
        conditions.push(
            sql`(${table.products.created_at}, ${table.products.id}) < (${cursor.created_at}, ${cursor.id})`
        );
    }

    const data = await db
        .select()
        .from(table.products)
        .where(conditions.length ? sql.join(conditions, sql` AND `) : undefined)
        .orderBy(
            desc(table.products.created_at),
            desc(table.products.id)
        )
        .limit(limit);

    let nextCursor = null
    if (data.length > 0) {
        const lastIndex = data.length - 1
        nextCursor = data[lastIndex]
    }

    return {
        data,
        nextCursor
    };
}