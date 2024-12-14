import react, { useState, useEffect } from "react";
import { CaretSortIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, Clock, Loader2, XCircle } from "lucide-react";
import { useGetCurrentUserOrders } from "@/api/OrdersApi";
import { Order } from "@/Types";

type allStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: allStatus = row.getValue("status");

      const statusStyles = {
        placed: {
          bg: "bg-yellow-500",
          text: "text-yellow-600",
          icon: <Clock className="animate-pulse" />,
        },
        inProgress: {
          bg: "bg-blue-500",
          text: "text-blue-600",
          icon: <Loader2 className="animate-spin" />,
        },
        paid: {
          bg: "bg-green-500",
          text: "text-green-600",
          icon: <CheckCircle />,
        },
        delivered: {
          bg: "bg-green-500",
          text: "text-green-600",
          icon: <CheckCircle />,
        },
        outForDelivery: {
          bg: "bg-red-500",
          text: "text-red-600",
          icon: <XCircle />,
        },
      };

      const currentStyle = statusStyles[status] || statusStyles["placed"];

      return (
        <div
          className={`flex gap-2 items-center capitalize ${currentStyle.text}`}
        >
          <div className={`w-3 h-3 rounded-full ${currentStyle.bg}`} />
          {/* {currentStyle.icon} */}
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
        </Button>
      );
    },
    cell: ({ row }) => {
      console.log(row.original.deliveryDetails.name);
      return (
        <div className="lowercase ">{row.original.deliveryDetails.name}</div>
      );
    },
  },
  ,
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <CaretSortIcon className=" ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      console.log(row.original.deliveryDetails.email);
      return (
        <div className="lowercase ">{row.original.deliveryDetails.email}</div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: () => <div className="text-center">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"));
      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
];

function DataTable() {
  //
  const [data, setData] = React.useState<Order | []>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { data: currUserOrders } = useGetCurrentUserOrders();

  //
  console.log(currUserOrders);
  useEffect(() => {
    if (!currUserOrders) {
      return;
    }
    setData(currUserOrders);
  }, [currUserOrders]);

  useEffect(() => {
    if (currUserOrders) {
      const total = currUserOrders.reduce((prevVal, currVal) => {
        return prevVal + currVal.totalAmount;
      }, 0);
      setTotalAmount(total);
    }
  }, [currUserOrders]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="container w-full mx-auto p-4 shadow">
        {/* Filter and Column Selector */}
        <div className="flex items-center justify-between py-4">
          <Input
            placeholder="Filter status..."
            value={
              (table.getColumn("status")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("status")?.setFilterValue(event.target.value)
            }
            className="max-w-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto text-gray-700">
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Table */}
        <div className="rounded-md border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="px-4 py-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-gray-500"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination & Total Money Spent */}
        <div className="flex items-center justify-between py-4">
          <div className="text-lg font-semibold text-gray-700">
            Total Money Spent:{" "}
            <span className="text-green-600">Rs: {totalAmount}</span>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="text-gray-700"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="text-gray-700"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* tatal spend */}
    </>
  );
}

export default DataTable;
