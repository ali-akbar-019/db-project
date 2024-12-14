import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

//
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  discountPrice: z.coerce
    .number()
    .min(0, "Discounted price must be a positive number"),
  description: z.string().min(1, "Description is required"),
  stock: z.coerce.number().min(0, "Stock  must be a positive number"),
  images: z.array(z.string()).default([]),
  gender: z.string().min(1, "Gender is Required is required"),
});
type NewProductFormData = z.infer<typeof formSchema>;
//
const AddProductDialogue = ({
  isOpen,
  setIsOpen,
  editProduct,
  isEditing = false,
  setEditProduct,
  setIsEditing,
}: any) => {
  //
  const fileInputRef = useRef(null);
  // @ts-ignore
  const [allImage, setAllImages] = useState([]);
  const form = useForm<NewProductFormData>({
    resolver: zodResolver(formSchema),
  });

  //
  const handleAttachmentChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      if (allImage.length < 4) {
        const file = e.target.files?.[0];
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          //
          // upload and get the file path
        }
      } else {
        toast.error("You Can Upload Maximum 4 Images");
      }
    } catch (error) {
      console.log("Error uploading FIle: ", error);
    }
  };
  //

  const onSave = async (data: NewProductFormData) => {
    console.log("Data to be saved :: ", data);
  };
  //
  const clearForm = () => {
    form.reset();
  };
  //

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen();
        clearForm();
      }}
    >
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold">New Product</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mb-6">
            Add the details of the product.
          </DialogDescription>
        </DialogHeader>
        {/*  */}
        <div className="relative overflow-y-auto p-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-100" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/*  */}
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-gray-100" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/*  */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-100"
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/*  */}
                <FormField
                  control={form.control}
                  name="discountPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discounted Price</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-100"
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/*  */}
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-gray-100"
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/*  */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Who Can Use This product</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                        >
                          <SelectTrigger className="bg-gray-100 border border-gray-300 rounded-md">
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="men">Men</SelectItem>
                            <SelectItem value="women">Women</SelectItem>
                            <SelectItem value="both">Both</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/*  */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="bg-gray-100"
                        placeholder="Enter Something About the product"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* images */}
              <FormItem>
                <FormLabel className="pb-3">Upload Image</FormLabel>
                <FormControl>
                  <Label htmlFor="file">
                    <div className="h-32 w-full border-dashed border-2 rounded-lg cursor-pointer flex items-center justify-center gap-3">
                      <Upload />
                      <span>Click to Upload Image</span>
                    </div>
                    <Input
                      id="file"
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleAttachmentChange}
                    />
                  </Label>
                </FormControl>
                <FormDescription>
                  Add images of the product. You can add up to 4 images.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialogue;
