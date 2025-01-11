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
import { Loader2, Upload } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  useCreateNewProduct,
  useUpdateProduct,
  useUploadFile,
} from "@/api/productsApi";
import AdminSmallProductCard from "./AdminSmallProductCard";
import LoadingButton from "./LoadingButton";
import { Button } from "./ui/button";
import { categories } from "@/utils/constant";

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
  category: z.string().min(1, "Category is Required is required"),
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
  const { isLoading: isFileUploading, uploadFile } = useUploadFile();
  //
  const { addNewProduct, isLoading: creatingProduct } = useCreateNewProduct();
  const { updateProduct, isLoading: updatingProduct } = useUpdateProduct();

  //

  const fileInputRef = useRef(null);
  // @ts-ignore
  const [allImage, setAllImages] = useState([]);
  const form = useForm<NewProductFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      brand: "",
      price: 0,
      discountPrice: 0,
      description: "",
      stock: 0,
      gender: "",
      category: "",
      images: [],
    },
  });
  //
  const deleteImage = async (fileName: string) => {
    const updatedImages = allImage.filter((img) => img != fileName);
    setAllImages(updatedImages);
  };

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
          console.log("file :: ", file, " form data :: ", formData);
          //
          // upload and get the file path
          const { filePath } = await uploadFile(formData);
          //
          console.log("File path of the uploaded image is :: ", filePath);
          // @ts-ignore
          setAllImages([...allImage, filePath]);
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
    console.log("is editing :: ", isEditing);

    data.images = allImage;
    try {
      if (!isEditing) {
        await addNewProduct(data);
      } else if (editProduct) {
        await updateProduct({ formData: data, id: editProduct.id });
      }
      clearForm();
      setIsOpen(false);
    } catch (error) {
      toast.error("An error occurred while saving the product.");
      console.error(error);
    }
  };
  //
  const clearForm = () => {
    form.reset({
      name: "",
      brand: "",
      price: 0,
      discountPrice: 0,
      description: "",
      stock: 0,
      gender: "",
      category: "",
      images: [],
    });
    setAllImages([]); // Clear images state
    setEditProduct(undefined); // Clear the editProduct state
    setIsEditing(false); // Reset the editing flag
  };

  //

  console.log("form error ", form.formState.errors);
  // console.log("form data :: ", form);
  useEffect(() => {
    if (editProduct) {
      form.reset({
        brand: editProduct.brand,
        category: editProduct.category,
        description: editProduct.description,
        discountPrice: editProduct.discountPrice,
        gender: editProduct.gender,
        name: editProduct.name,
        price: editProduct.price,
        stock: editProduct.stock,
      });
      // @ts-ignore
      setAllImages(editProduct?.images?.map((img) => img.url) || []);
      console.log("all images :: ", allImage);
    }
    console.log("editing products :: ", editProduct);
  }, [editProduct]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen();
        clearForm();
      }}
    >
      <DialogContent className="md:max-w-3xl max-w-md mx-auto p-6 md:p-8 bg-white rounded-lg shadow-lg overflow-y-auto max-h-full">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold">New Product</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mb-6">
            Add the details of the product.
          </DialogDescription>
        </DialogHeader>
        {/*  */}
        <div className="relative overflow-y-auto p-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => {
                console.log("Form submitted with data:", data);
                onSave(data);
              })}
              className="space-y-6"
            >
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
                            <SelectItem value="MALE">Male</SelectItem>
                            <SelectItem value="FEMALE">Female</SelectItem>
                            <SelectItem value="BOTH">Both</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/*  */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                        >
                          <SelectTrigger className="bg-gray-100 border border-gray-300 rounded-md">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat, idx) => (
                              <SelectItem key={idx} value={cat.value}>
                                {cat.text}
                              </SelectItem>
                            ))}
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
                {isEditing ? (
                  <div className="text-gray-500 italic">
                    Images cannot be changed while editing the product.
                  </div>
                ) : (
                  <>
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
                      Add images of the product. You can add up to 4 images.{" "}
                      <span className="text-red-500">
                        {" "}
                        Once the product is uploaded the images can not be
                        changed
                      </span>
                    </FormDescription>
                    <FormMessage />
                  </>
                )}
              </FormItem>
              <div className="flex gap-2 overflow-x-auto">
                {allImage &&
                  allImage.length > 0 &&
                  allImage.map((file, index) => {
                    return (
                      <AdminSmallProductCard
                        key={index}
                        // @ts-ignore
                        image={`${file}`}
                        remove={deleteImage}
                        isEditing={isEditing}
                      />
                    );
                  })}
              </div>
              <div className="mt-6">
                {creatingProduct || updatingProduct ? (
                  <LoadingButton />
                ) : (
                  <Button type="submit">
                    {isEditing ? "Update Product" : "Save Product"}
                  </Button>
                )}

                <Button type="button" className="ms-2" onClick={clearForm}>
                  Clear
                </Button>
              </div>
            </form>
          </Form>
          {/*  */}
          {isFileUploading && (
            <div className="absolute w-full h-full top-0">
              <div className="flex items-center justify-center min-h-full bg-white/50">
                <Loader2
                  className="animate-spin text-primary"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialogue;
