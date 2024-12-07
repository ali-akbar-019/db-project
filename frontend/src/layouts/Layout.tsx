import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col ">
      <Header />
      <div className="flex-1 ">{children}</div>
      <Footer />
    </div>
  );
};
