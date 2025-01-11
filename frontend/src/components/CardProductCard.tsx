// @ts-nocheck
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Edit2, Trash2 } from "lucide-react";
import { useDeleteFromCart, useUpdateMyCart } from "@/api/cartApi";
import { HOST } from "@/utils/constant";

type Props = {
  name: string;
  quantity: number;
  price: number;
  id: String;
  image: string;
  desc?: string;
};

const CardProductCard = ({ name, quantity, price, id, image, desc }: Props) => {
  // console.log("image url :: ", image);
  const { deleteFromCart } = useDeleteFromCart();
  const { updateCart } = useUpdateMyCart();
  const [openConfirmationMenu, setOpenConfirmationMenu] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [newQty, setNewQty] = useState(quantity);

  const handleDelete = async () => {
    await deleteFromCart(id);
    setOpenConfirmationMenu(false);
  };

  const handleEdit = async () => {
    await updateCart({ id, quantity: newQty }); // Use updateCart instead of updateCartItem
    setOpenEditProduct(false);
  };

  return (
    <>
      <Card className="mb-4 overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            <div className="relative w-full sm:w-1/3 h-48 sm:h-auto">
              <img
                src={`${HOST}/${image}`}
                alt={name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-lg capitalize line-clamp-1">
                  {name}
                </h4>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpenEditProduct(true)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpenConfirmationMenu(true)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mt-1">
                Delivery: 1 to 7 day(s)
              </p>
              <Separator className="my-2" />
              <div className="flex justify-between items-center mt-2">
                <Badge variant="secondary">Qty: {quantity}</Badge>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-muted-foreground">Total:</p>
                <p className="font-semibold text-lg">
                  $ {(price * quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={openConfirmationMenu}
        onOpenChange={setOpenConfirmationMenu}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this product from your cart?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenConfirmationMenu(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openEditProduct} onOpenChange={setOpenEditProduct}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product Quantity</DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-4 my-4">
            <div className="relative w-20 h-20">
              <img
                src={`${HOST}/${image}`}
                alt={name}
                className="object-cover w-full h-full rounded"
              />
            </div>
            <div>
              <h4 className="font-semibold capitalize">{name}</h4>
              <p>{desc}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="quantity" className="text-sm font-medium">
              Quantity:
            </label>
            <Input
              id="quantity"
              type="number"
              min={1}
              max={10}
              value={newQty}
              onChange={(e) => setNewQty(parseInt(e.target.value))}
              className="w-20"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditProduct(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CardProductCard;
