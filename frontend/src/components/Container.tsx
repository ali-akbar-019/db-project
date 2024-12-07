import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("px-10 md:px-20 lg:px-24", className)}>{children}</div>
  );
};

export default Container;
