import ProductTable from "@/components/ui/ProductTable";
import { getProducts } from "@/feature/product/service";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    cursor?: string;
    category?: string;
    sortBy?: string;
    order?: "asc" | "desc";
  }>;
}) {
  const params = await searchParams;

  const limit = 10;

  const cursor = params.cursor
    ? JSON.parse(decodeURIComponent(params.cursor))
    : undefined;

  const category = params.category || undefined;

  const result = await getProducts({
    limit,
    cursor,
    category,
  });

  return (
    <div className="p-6">
      <ProductTable
        data={result.data}
        nextCursor={result.nextCursor}
        category={category}
      />
    </div>
  );
}