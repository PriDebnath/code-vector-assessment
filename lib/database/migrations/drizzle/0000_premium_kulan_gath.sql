CREATE TABLE IF NOT EXISTS  "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"category" varchar(200) NOT NULL,
	"price" numeric NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_deleted" boolean DEFAULT false
);
--> statement-breakpoint
CREATE INDEX "index_products_created_at_id" ON "products" USING btree ("created_at","id");--> statement-breakpoint
CREATE INDEX "index_products_category_created_at_id" ON "products" USING btree ("category","created_at","id");