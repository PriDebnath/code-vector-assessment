import { db } from "../connection";
import { eq, ilike } from "drizzle-orm";
import { products, table } from "../model";
import { prefix } from "../seed/constant";

async function deleteSeed() {
  const key ="Deleting completed in"
  console.time(key);
  await db.delete(table.products)
    .where(ilike(table.products.name, `${prefix}%`))

  console.timeEnd(key);
  process.exit(1)
}

deleteSeed();
