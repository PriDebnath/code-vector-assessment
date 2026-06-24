DROP INDEX "index_products_created_at_id";--> statement-breakpoint
DROP INDEX "index_products_category_created_at_id";--> statement-breakpoint
CREATE INDEX "index_products_created_at_id" ON "products" USING btree ("created_at" DESC NULLS LAST,"id" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "index_products_category_created_at_id" ON "products" USING btree ("category","created_at" DESC NULLS LAST,"id" DESC NULLS LAST);