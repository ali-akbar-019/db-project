import AddProductDialogue from "@/components/AddProductDialogue";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useState } from "react";

const AdminProductsPage = () => {
  const [openAddProductModel, setOpenAddProductModel] = useState(false);
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
        </div>
      </div>
      <AddProductDialogue
        isOpen={openAddProductModel}
        setIsOpen={setOpenAddProductModel}
      />
    </>
  );
};

export default AdminProductsPage;
