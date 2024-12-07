import { Heart, Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

          <span>
            <ShoppingCart className="w-5 h-5" />
          </span>

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
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Admin</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default Header;
