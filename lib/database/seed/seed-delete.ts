import { db } from "../connection";
import { eq, ilike } from "drizzle-orm";
import { products, table } from "../model";
import { prefix } from "../seed/constant";

async function deleteSeed() {
  console.time("delete seeding");

  await db.delete(table.products)
    .where(ilike(table.products.name, `${prefix}%`))

  console.timeEnd("delete seeding");
  process.exit(1)
}

deleteSeed();
