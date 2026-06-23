"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Product } from "@/feature/product/schema";

 

interface Props {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

export default function ProductTable({
  data,
  total,
  page,
  limit,
}: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const totalPages = Math.ceil(total / limit);

  function updateQuery(newParams: Record<string, string>) {
    const search = new URLSearchParams(params.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      search.set(key, value);
    });

    router.push(`?${search.toString()}`);
  }

  function handleSort(field: string) {
    const currentOrder = params.get("order") || "desc";
    const currentSort = params.get("sortBy");

    const newOrder =
      currentSort === field && currentOrder === "asc"
        ? "desc"
        : "asc";

    updateQuery({
      sortBy: field,
      order: newOrder,
      page: "1",
    });
  }

  return (
    <div>
      {/* TABLE */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
              Name
            </TableHead>
            <TableHead onClick={() => handleSort("category")} className="cursor-pointer">
              Category
            </TableHead>
            <TableHead onClick={() => handleSort("price")} className="cursor-pointer">
              Price
            </TableHead>
            <TableHead onClick={() => handleSort("created_at")} className="cursor-pointer">
              Created
            </TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No products found
              </TableCell>
            </TableRow>
          )}

          {data.map((p, i) => (
            <TableRow key={i}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell>₹{p.price}</TableCell>
              <TableCell>
                {new Date(p.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(p.updated_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {p.is_deleted ? "Deleted" : "Active"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      <div className="flex items-center gap-2 mt-4">
        <Button
          disabled={page === 1}
          onClick={() =>
            updateQuery({ page: String(page - 1) })
          }
        >
          Prev
        </Button>

        <span>
          Page {page} / {totalPages}
        </span>

        <Button
          disabled={page === totalPages}
          onClick={() =>
            updateQuery({ page: String(page + 1) })
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}