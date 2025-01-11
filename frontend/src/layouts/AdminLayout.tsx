import {
  BarChart,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingBasket,
  Truck,
  UsersRound,
} from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const [activeLink, setActiveLink] = useState("/");
  const location = useLocation();
  const links = [
    {
      name: "Dashboard",
      link: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      link: "/admin/products",
      icon: ShoppingBasket,
    },
    {
      name: "Customers",
      link: "/admin/customers",
      icon: UsersRound,
    },
    {
      name: "Orders",
      link: "/admin/orders",
      icon: Truck,
    },
    {
      name: "Visuals",
      link: "/admin/visuals",
      icon: BarChart,
    },
    {
      name: "Settings",
      link: "/admin/settings",
      icon: Settings,
    },
  ];
  //
  useEffect(() => {
    // console.log(location.pathname);
    if (location.pathname) setActiveLink(location.pathname);
  }, [location.pathname]);
  return (
    <>
      <div className="grid grid-cols-4">
        {/* sidebar */}
        <div className="col-span-1 border-e-2 h-[100vh] pb-10 pt-5 px-5 relative">
          <Link to={"/"}>
            <div className="">
              <img
                src="/favicon.png"
                alt="logo icon"
                className="w-[50px] h-[50px] object-contain"
              />
              <p className="text-3xl font-bold">
                Shop<span className="text-cyan-600">Ease</span>
              </p>
            </div>
          </Link>
          {/* links */}
          <div className="space-y-5 mt-10 ">
            {links.map((singleLink, index) => (
              <Link
                to={singleLink.link}
                key={index}
                className={`text-gray-500 flex items-center gap-2 p-3 rounded-xl transition-all  ${
                  activeLink == singleLink.link
                    ? "bg-cyan-800 text-white"
                    : "hover:bg-gray-800 hover:text-white"
                }`}
              >
                <singleLink.icon className="w-6 h-6 " /> {singleLink.name}
              </Link>
            ))}
          </div>
          <div className="absolute bottom-10">
            <Link
              to={"/"}
              className="text-gray-500 flex items-center gap-2 p-3 rounded-xl transition-all hover:bg-red-500 hover:text-white"
            >
              <LogOut className="w-6 h-6 " /> Logout
            </Link>
          </div>
        </div>
        {/*  */}
        <div className="col-span-3">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
