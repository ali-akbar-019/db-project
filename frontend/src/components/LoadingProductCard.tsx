import { cn } from "@/lib/utils";
const LoadingProductCard = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative w-full h-full p-4 border-2 border-gray-200 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse",
        className
      )}
    >
      {/* Loading Image */}
      <div className="relative mb-4 h-60 bg-gray-300 rounded-lg animate-pulse">
        <div className="absolute top-3 right-3 p-2 bg-gray-500 rounded-full opacity-50"></div>
      </div>

      {/* Loading Text Section */}
      <div className="pt-2 space-y-2">
        <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>

      {/* Glowing effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-transparent via-transparent to-transparent animate-glow"></div>
    </div>
  );
};

export default LoadingProductCard;
