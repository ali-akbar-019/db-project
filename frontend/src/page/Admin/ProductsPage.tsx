import { useDeleteProduct, useGetAllProducts } from "@/api/productsApi";
import AddProductDialogue from "@/components/AddProductDialogue";
import DeleteProductCard from "@/components/DeleteProductCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ChevronDownIcon,
  Edit2,
  Loader2,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";

const AdminProductsPage = () => {
  const [openAddProductModel, setOpenAddProductModel] = useState(false);
  const { data: allProducts, isLoading: productsLoading } = useGetAllProducts();
  const [isEditing, setIsEditing] = useState(false);
  const [editProductData, setEditProductData] = useState(undefined);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState([]);
  const [showDeleteDialogue, setShowDeleteDialogue] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState("");
  const { isLoading: deletingProduct } = useDeleteProduct();

  useEffect(() => {
    // @ts-ignore
    if (allProducts && allProducts.products) {
      setData(allProducts.products);
      // console.log("prods :: ", allProducts.products);
    }
  }, [allProducts]);

  //
  // table
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  //
  const columns = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "brand",
      header: "Brand",
      cell: ({ row }) => <div>{row.getValue("brand")}</div>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <div>{row.getValue("category")}</div>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => <div>{row.getValue("stock")}</div>,
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => (
        <div className="flex items-center">
          <span className="mr-2">{row.getValue("rating")}</span>
          <Star className="w-4 h-4 text-yellow-500" />
        </div>
      ),
    },
    {
      accessorKey: "Edit",
      header: "Edit",
      cell: ({ row }) => (
        <div className="font-medium">
          <Button
            variant="outline"
            className="text-sm"
            onClick={() => {
              setIsEditing(true);
              setEditProductData(row.original);
              setOpenAddProductModel(true);
            }}
          >
            <Edit2 className="w-4 h-4 text-green-600" />
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "Delete",
      header: "Delete",
      cell: ({ row }) => (
        <div className="font-medium">
          <Button
            variant="outline"
            className="text-sm"
            onClick={() => {
              setDeleteProductId(row.original.id);
              setShowDeleteDialogue(true);
            }}
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];
  //
  // console.log("all products :: ", data);
  // @ts-ignore
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
      <div className="h-[100vh] overflow-y-auto bg-slate-50">
        <div className="bg-white p-5 text-2xl font-bold text-gray-900 shadow-sm">
          <h3>Products</h3>
        </div>
        {/*  */}
        <div className="bg-white mt-5 rounded-xl p-5 m-10">
          <div className="flex items-center justify-between">
            <p className="font-semibold capitalize"> Products list</p>
            <button
              className="bg-purple-600 text-white flex items-center gap-1 font-bold pe-3 ps-2 py-2 rounded-xl"
              onClick={() => setOpenAddProductModel(true)}
            >
              <Plus className="w-5 h-5 " />
              Add Product
            </button>
          </div>
          <Separator className="my-5" />
          {/*table  */}
          <div className="mt-10 ">
            <h4 className="text-center text-3xl font-bold capitalize">
              All Products
            </h4>
            <div className="container w-full mx-auto p-4 shadow">
              {/* Filter and Column Selector */}
              <div className="flex items-center justify-between py-4">
                <Input
                  placeholder="Filter Name..."
                  value={
                    (table.getColumn("name")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
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
                  {deletingProduct ||
                    (productsLoading && (
                      <div className="absolute w-full h-full top-0">
                        <div className="flex items-center justify-center min-h-full bg-white/50">
                          <Loader2
                            className="animate-spin text-primary"
                            width={100}
                            height={100}
                          />
                        </div>
                      </div>
                    ))}
                  {!productsLoading && !deletingProduct && (
                    <>
                      <TableHeader className="bg-gray-100">
                        {table.getHeaderGroups().map((headerGroup) => (
                          <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                              return (
                                <TableHead
                                  key={header.id}
                                  className="px-4 py-2"
                                >
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
                    </>
                  )}
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
          {/*  */}
        </div>
      </div>
      <AddProductDialogue
        isOpen={openAddProductModel}
        setIsOpen={setOpenAddProductModel}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editProduct={editProductData}
        setEditProduct={setEditProductData}
      />
      <DeleteProductCard
        id={deleteProductId}
        isOpen={showDeleteDialogue}
        setIsOpen={setShowDeleteDialogue}
      />
    </>
  );
};

export default AdminProductsPage;
