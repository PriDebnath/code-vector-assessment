import { env } from './lib/utils/load-env';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './lib/database/migrations/drizzle',
    schema: './lib/database/model/index.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: env.PG_DATABASE_URL!,
    },
});
