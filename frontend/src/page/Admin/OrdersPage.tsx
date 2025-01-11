import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";

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

import { useGetAllOrders, useUpdateOrderStatus } from "@/api/orderApi";
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

import { Order } from "@/utils/Types";
//
//
//
type allStatus =
  | "PLACED"
  | "PAID"
  | "IN_PROGRESS"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export type Payment = {
  id: string;
  status: "pending" | "processing" | "success" | "failed";
};

//

const OrdersPage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [updateData, setUpdateData] = useState({ status: "paid", orderId: "" });
  const { orders } = useGetAllOrders();
  const { isLoading, updateOrderStatus } = useUpdateOrderStatus();
  const [data, setData] = useState<Order[]>([]);

  //
  console.log("orders :: ", orders);
  useEffect(() => {
    if (orders) setData(orders);
  }, [orders]);

  useEffect(() => {
    const update = async () => {
      if (updateData?.orderId && updateData.status) {
        try {
          await updateOrderStatus(updateData);
        } catch (error) {
          console.error("Failed to update order status:", error);
        }
      }
    };
    update();
  }, [updateData, updateOrderStatus]);

  //

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  //

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status: allStatus = row.getValue("status");

        const statusStyles = {
          PLACED: {
            bg: "bg-yellow-500",
            text: "text-yellow-600",
          },
          IN_PROGRESS: {
            bg: "bg-blue-500",
            text: "text-blue-600",
          },
          PAID: {
            bg: "bg-green-500",
            text: "text-green-600",
          },
          DELIVERED: {
            bg: "bg-green-500",
            text: "text-green-600",
          },
          OUT_FOR_DELIVERY: {
            bg: "bg-red-500",
            text: "text-red-600",
          },
          CANCELLED: {
            bg: "bg-gray-500",
            text: "text-gray-600",
          },
        };

        const currentStyle = statusStyles[status] || statusStyles["placed"];

        return (
          <div
            className={`flex gap-2 items-center capitalize ${currentStyle.text}`}
          >
            <div className={`w-3 h-3 rounded-full ${currentStyle.bg}`} />

            {status}
          </div>
        );
      },
    },
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Order Id
            <CaretSortIcon className=" ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="lowercase ">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Customer Name
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.original.deliveryDetails.name}</div>
      ),
    },
    {
      accessorKey: "Edit",
      header: () => <div className="">Edit</div>,
      cell: ({ row }) => {
        return (
          <div className=" font-medium">
            {/* "paid" | "inProgress" | "outForDelivery" | "delivered" */}
            <Select
              onValueChange={(value) =>
                setUpdateData({ orderId: row.original.id, status: value })
              }
              value={row.original.status}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PAID">Paid</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="OUT_FOR_DELIVERY">
                  Out For Delivery
                </SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="PLACED">Placed</SelectItem>
                <SelectItem value="CANCELLED">Cancel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      },
    },
  ];
  //

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
    <div className="h-[100vh] overflow-y-auto bg-slate-50">
      <div className="bg-white p-5 text-2xl font-bold text-gray-900 shadow-sm">
        <h3>Orders</h3>
      </div>
      {/*  */}
      <div className="bg-white mt-5 rounded-xl p-5 m-10">
        <div className="">
          <p className="font-semibold capitalize"> Orders list</p>
        </div>
        <Separator className="my-5" />
        {/*table  */}
        <div className="mt-10 ">
          <h4 className="text-center text-3xl font-bold capitalize mb-10">
            All Orders
          </h4>
          {/* table */}
          <div className="container w-full mx-auto p-4 shadow">
            {/* Filter and Column Selector */}
            <div className="flex items-center justify-between py-4">
              <Input
                placeholder="Filter Status..."
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
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
