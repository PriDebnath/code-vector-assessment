import { boolean, pgTable, serial, text, timestamp, varchar,integer, index } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: serial().primaryKey(),
    name: varchar({ length: 200 }).notNull(),
    category: varchar({ length: 200 }).notNull(),
    price: integer().notNull(),
    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp().defaultNow().notNull(),
    is_deleted: boolean().default(false),
}, (table) => {
    return [
        index("index_products_created_at_id").on(
            table.created_at,
            table.id),
        index("index_products_category_created_at_id").on(
            table.category,
            table.created_at,
            table.id
        ),
    ]
})
