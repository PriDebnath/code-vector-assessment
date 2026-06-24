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

  const history = params.get("history")
    ? JSON.parse(decodeURIComponent(params.get("history")!))
    : [];

  function encodeCursor(cursor: any) {
    return encodeURIComponent(JSON.stringify(cursor));
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

  function getNextLink() {
    if (!nextCursor) return "#";

    const currentCursor = history.length
      ? history[history.length - 1]
      : null;

    const newHistory = currentCursor
      ? [...history, nextCursor]
      : [nextCursor];

    return buildQuery({
      cursor: encodeCursor(nextCursor),
      history: encodeURIComponent(JSON.stringify(newHistory)),
    });
  }

  function getPrevLink() {
    if (history.length === 0) return "#";

    const newHistory = history.slice(0, -1);
    const prevCursor = newHistory[newHistory.length - 1];

    return buildQuery({
      cursor: prevCursor ? encodeCursor(prevCursor) : undefined,
      history: encodeURIComponent(JSON.stringify(newHistory)),
    });
  }

  return (
    <div className="space-y-4 border-2 rounded-xl p-2">
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
                cursor: undefined,
                history: undefined,
              })}
            >
              {cat}
            </Link>
          </Button>
        ))}
      </div>

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

      <div className="flex justify-center gap-2">
        {/* PREV */}
        <Button asChild disabled={history.length === 0}>
          <Link href={getPrevLink()}>Prev</Link>
        </Button>

        {/* NEXT */}
        <Button asChild disabled={!nextCursor}>
          <Link href={getNextLink()}>Next</Link>
        </Button>
      </div>
    </div>
  );
}