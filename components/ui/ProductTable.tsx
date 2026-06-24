"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
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
  nextCursor: {
    created_at: Date;
    id: number;
  } | null;
  category?: string;
}

const categories = ["all", "electronics", "clothing", "books", "home"];

export default function ProductTable({
  data,
  nextCursor,
  category,
}: Props) {
  const pathname = usePathname();
  const params = useSearchParams();

  // ✅ only required fields
  function encodeCursor(cursor: any) {
    return encodeURIComponent(
      JSON.stringify({
        id: cursor.id,
        created_at: cursor.created_at,
      })
    );
  }

  function buildQuery(newParams: Record<string, string | undefined>) {
    const search = new URLSearchParams(params.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (!value) {
        search.delete(key);
      } else {
        search.set(key, value);
      }
    });

    return `${pathname}?${search.toString()}`;
  }

  // ✅ only next cursor
  function getNextLink() {
    if (!nextCursor) return "#";

    return buildQuery({
      cursor: encodeCursor(nextCursor),
    });
  }

  return (
    <div className="space-y-4 border-2 rounded-xl p-2">
      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={category === cat ? "default" : "outline"}
            asChild
          >
            <Link
              href={buildQuery({
                category: cat === "all" ? undefined : cat,
                cursor: undefined, // ✅ reset pagination
              })}
            >
              {cat}
            </Link>
          </Button>
        ))}
      </div>

      {/* Table */}
      <Table className="border rounded-xl overflow-hidden bg-muted">
        <TableHeader className="bg-muted-foreground">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No products found
              </TableCell>
            </TableRow>
          )}

          {data.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell>₹{p.price}</TableCell>
              <TableCell>
                {new Date(p.created_at).toLocaleDateString("en-GB")}
              </TableCell>
              <TableCell>
                {p.is_deleted ? "Deleted" : "Active"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-center">
        <Button asChild disabled={!nextCursor}>
          <Link href={getNextLink()}>Next</Link>
        </Button>
      </div>
    </div>
  );
}