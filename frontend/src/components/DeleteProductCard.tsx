import React, { SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useDeleteProduct } from "@/api/productsApi";

type Props = {
  isOpen: boolean;
  id: string;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};
const DeleteProductCard = ({ id, isOpen, setIsOpen }: Props) => {
  const { deleteProduct } = useDeleteProduct();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className=" mx-auto p-6 md:p-8 bg-white rounded-lg shadow-lg overflow-y-auto max-h-full">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold">
            Delete Product
          </DialogTitle>
          <DialogDescription>
            <p className="text-base text-gray-500 capitalize">
              {" "}
              Are You Sure You Want to delete the product
            </p>
            <Button
              variant={"destructive"}
              className="w-full mt-5"
              onClick={async () => {
                await deleteProduct(id);
                setIsOpen(false);
              }}
            >
              Yes
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductCard;
