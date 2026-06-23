import { sql } from "drizzle-orm";
import { db } from "../connection";
import { generate_count, prefix } from "./constant";


async function seed() {
  console.time("seeding");

  await db.execute(sql`
    INSERT INTO products (name, category, price, created_at, updated_at)
    SELECT
      ${prefix} || gs,
      (ARRAY['electronics', 'clothing', 'books', 'home'])[floor(random()*4 + 1)],
      8,
      NOW() - (random() * interval '30 days'),
      NOW()
    FROM generate_series(1, ${generate_count}) as gs;
  `);

  console.timeEnd("seeding");
  process.exit(1)

}

seed();
