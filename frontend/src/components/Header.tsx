// @ts-nocheck
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlignJustify,
  Heart,
  Loader2,
  Search,
  ShoppingCart,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
//
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AspectRatio } from "./ui/aspect-ratio";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import CardProductCard from "./CardProductCard";
import { useEffect, useState } from "react";
import { useGetCurrentUserCart, useMarkOrderedFromCart } from "@/api/cartApi";
import { Separator } from "./ui/separator";
import { DELIVERY_CHARGES } from "@/utils/constant";
import { useCreateNewOrder } from "@/api/orderApi";
import { CheckoutSessionData } from "@/utils/Types";
import { useGetMyUser } from "@/api/MyUserApi";
import { toast } from "sonner";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Header = () => {
  //
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  //
  const { cartData, isLoading: isCartLoading } = useGetCurrentUserCart();
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateNewOrder();

  // console.log("cart data :: ", cartData);
  // @ts-ignore
  const { markCartItemsOrdered } = useMarkOrderedFromCart();
  const { currentUser } = useGetMyUser();
  const [totalPrice, setTotalPrice] = useState<number | undefined>(0);
  const link = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Products",
      url: "/products",
    },
    {
      name: "Categories",
      url: "/categories",
    },
    {
      name: "About",
      url: "/about",
    },
    {
      name: "Contact ",
      url: "/contact",
    },
  ];
  //
  const onCheckout = async () => {
    if (!cartData || !totalPrice || !currentUser) {
      return;
    }
    // console.log("total :: ", totalPrice, currentUser);
    if (currentUser?.data?.isProfileSetup && totalPrice) {
      //handle the checkout
      try {
        //create new order

        // redirect to the thank you page
        // and then mark the cart items as ordered
        const checkoutData: CheckoutSessionData = {
          cartItems: cartData,
          deliveryDetails: {
            addressLine1: currentUser?.data?.addressLine1,
            city: currentUser?.data?.city,
            email: currentUser?.data?.email,
            country: currentUser?.data?.country,
            name: currentUser?.data?.name,
          },
          totalAmount: parseInt((totalPrice + DELIVERY_CHARGES).toFixed(2)),
          userId: currentUser?.data?.id,
          phone: currentUser?.data?.phone,
          status: "PLACED",
        };
        const data = await createCheckoutSession(checkoutData);
        //
        //
        await markCartItemsOrdered();
        window.location.href = data.url;
        // first clear cart
      } catch (error) {
        console.log("Error while checking out ");
      }
    } else {
      toast.error("Please setup your profile first");
      navigate("/profile");
    }
  };
  //
  let isEmpty = !cartData || cartData?.length <= 0;
  //
  useEffect(() => {
    const total = cartData?.reduce((prev, curr) => {
      const productPrice = curr.product.discountPrice || curr.product.price; // Use discountPrice if available
      return prev + productPrice * curr.quantity;
    }, 0);

    setTotalPrice(total || 0);
  }, [cartData]);

  return (
    <header className="shadow-sm">
      <nav className="flex items-center justify-between p-5 px-10 md:px-20 lg:px-24">
        <div className="space-x-5 text-sm font-semibold md:block hidden">
          {link.map((singleLink, index) => (
            <Link key={index} to={singleLink.url}>
              {singleLink.name}
            </Link>
          ))}
        </div>
        <div className="font-bold tracking-tighter ">
          Shop<span className="text-red-600">Ease</span>
        </div>
        <div className="flex items-center gap-7">
          <span>
            <Search className="w-5 h-5" />
          </span>
          <span>
            <Link to={"/fav-products"}>
              <Heart className="w-5 h-5" />
            </Link>
          </span>

          <Sheet>
            <SheetTrigger className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="bg-red-400 text-white font-semibold text-sm w-5 h-5  flex items-center justify-center rounded-full absolute -top-3 -right-4">
                {cartData && cartData?.length ? cartData?.length : 0}
              </span>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  Welcome to
                  <span className="ms-1 font-bold tracking-tighter ">
                    Shop<span className="text-red-600">Ease</span>
                  </span>
                </SheetTitle>
                <SheetDescription className="  flex items-center justify-center flex-col overflow-hidden">
                  {isEmpty ? (
                    <>
                      <div className="w-full h-full mt-[200px]">
                        <AspectRatio ratio={16 / 12}>
                          <img
                            src="/imgs/hippo-empty-cart.png"
                            alt="image"
                            className="w-full h-full object-cover -mt-10"
                          />
                        </AspectRatio>
                        <p className="text-center">Cart is Empty</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-center my-5">
                        Total: ${totalPrice?.toFixed(2)}
                      </p>
                      <div className="max-h-[52vh] overflow-y-auto">
                        {cartData?.map((item, idx) => (
                          <>
                            <CardProductCard
                              key={idx}
                              id={item.id as string}
                              name={item.product.name}
                              price={item?.product?.price}
                              quantity={item.quantity}
                              image={item?.product?.images[0].url}
                              desc={item?.product?.description}
                            />
                          </>
                        ))}
                      </div>
                    </>
                  )}
                  {/*  */}
                  {cartData && totalPrice && (
                    <div className="space-y-4 w-full mt-5">
                      <Separator />
                      <div className="flex justify-between text-sm">
                        <span>Subtotal ({cartData?.length} items)</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Delivery Charges</span>
                        <span>${DELIVERY_CHARGES.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>
                          ${(totalPrice + DELIVERY_CHARGES).toFixed(2)}
                        </span>
                      </div>
                      <Button
                        className="w-full"
                        disabled={cartData.length === 0 || isCheckoutLoading}
                        onClick={onCheckout}
                      >
                        {isCheckoutLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Checkout
                      </Button>
                    </div>
                  )}
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          {/* small nav */}
          <Drawer>
            <DrawerTrigger className="block md:hidden">
              <AlignJustify />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Shope Ease</DrawerTitle>
              </DrawerHeader>
              <DrawerFooter>
                {/*  */}
                <div className="text-sm font-semibold  mb-4 flex flex-col justify-center gap-2 items-center">
                  {link.map((singleLink, index) => (
                    <Link key={index} to={singleLink.url}>
                      {singleLink.name}
                    </Link>
                  ))}
                </div>
                {/*  */}
                <DrawerClose>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          {/* small nav ends here */}

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="hidden md:block">
                <Avatar className="w-8 h-8 ">
                  <AvatarImage
                    src={
                      user?.picture
                        ? user?.picture
                        : "https://github.com/shadcn.png"
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to={"/profile"}>Profile</Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link to={"/billing"}>Billing</Link>
                </DropdownMenuItem>
                {/* admin pannel just for the big screens */}
                <DropdownMenuItem className="hidden lg:block">
                  <Link to={"/admin"}>Admin</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button onClick={() => logout()}>Log out</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => loginWithRedirect()}>Log in</Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
