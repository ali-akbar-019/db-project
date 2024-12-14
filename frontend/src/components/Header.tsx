import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
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

const Header = () => {
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

  let isEmpty = true;
  return (
    <header className="shadow-sm">
      <nav className="flex items-center justify-between p-5 px-10 md:px-20 lg:px-24">
        <div className="space-x-5 text-sm font-semibold">
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
            <Heart className="w-5 h-5" />
          </span>

          <Sheet>
            <SheetTrigger>
              <ShoppingCart className="w-5 h-5" />
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
                    <>not empty</>
                  )}
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger className="">
              <Avatar className="w-8 h-8 ">
                <AvatarImage src="https://github.com/shadcn.png" />
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
              <DropdownMenuItem>
                <Link to={"/admin"}>Admin</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default Header;
