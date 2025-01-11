import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  addressLine1: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is Required"),
  country: z.string().min(1, "City is Required"),
  phone: z
    .string()
    .min(11, "Phone number is required")
    .max(15, "Phone number is too long")
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
});

export type UserFormData = z.infer<typeof formSchema>; //using zod to give the type

type Props = {
  onSave: (userProfileData: UserFormData) => void;
  isLoading?: boolean;
  currentUser?: any;
  title?: string;
  buttonText?: string;
};
const UserProfileForm = ({
  isLoading,
  onSave,
  currentUser,
  title,
  buttonText,
}: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser.data,
  });
  //

  // Store the previous currentUser in a ref
  const prevUser = useRef(currentUser);
  // console.log("current user :: ", currentUser.data);
  useEffect(() => {
    // Only reset the form if currentUser has actually changed
    if (currentUser !== prevUser.current) {
      form.reset(currentUser.data);
      prevUser.current = currentUser; // Update the ref with the new currentUser
    }
  }, [currentUser, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="space-y-4 bg-gray-50 rounded-lg md:p-10 p-5"
      >
        <div>
          <h2 className="text-2xl font-bold">
            {title ? title : "User Profile Form"}
          </h2>

          <FormDescription>
            View and change your profile information here
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />

        {/*  */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-white"
                  placeholder="start with +92 and give no space"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/*  */}
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit">{buttonText ? buttonText : "Save"}</Button>
        )}
      </form>
    </Form>
  );
};

export default UserProfileForm;
