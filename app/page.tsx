import ProductTable from "@/components/ui/ProductTable";
import { getProducts } from "@/feature/product/service";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    sortBy?: string;
    order?: "asc" | "desc";
  }>;
}) {
  const params = await searchParams;

  const page = Number(params.page || 1);
  const sortBy = (params.sortBy || "created_at") as any;
  const order = (params.order || "desc") as "asc" | "desc";
  const limit = 10;

  const result = await getProducts({
    page,
    limit,
    sortBy,
    order,
  });

  const { data, total } = result;

  return (
    <div className="p-6 ">
      <ProductTable
        data={data}
        limit={limit}
        page={page}
        total={total}
      />
    </div>
  );
}