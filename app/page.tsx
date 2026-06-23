import ProductTable from "@/components/ui/ProductTable";
import { getProducts } from "@/feature/product/service";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    page?: string;
    sortBy?: string;
    order?: "asc" | "desc";
  };
}) {
  const page = Number(searchParams.page || 1);
  const sortBy = (searchParams.sortBy || "created_at") as any;
  const order = (searchParams.order || "desc") as "asc" | "desc";
  const limit =  10

  const result = await getProducts({
    page,
    limit ,
    sortBy,
    order,
  });
  const { data,total } = result

  return (
    <div className="p-6">
      <ProductTable 
       data={ data} 
       limit={limit}
        page={page}
        total={total}
      />
    </div>
  );
}