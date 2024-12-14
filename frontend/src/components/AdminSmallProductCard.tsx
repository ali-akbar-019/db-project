import { HOST } from "@/utils/costants";
import { Trash } from "lucide-react";

type Props = {
  image: string;
  remove: (image: string) => void;
};
const AdminSmallProductCard = ({ image, remove }: Props) => {
  // console.log(`${HOST}/${image}`)
  return (
    <>
      <div className="group relative">
        <img
          src={`${HOST}/${image}`}
          alt="small image"
          className="md:w-20 md:h-20 w-16 h-16 rounded-lg object-cover cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
        />
        <div className="text-sm absolute top-1 right-1 ">
          <Trash
            className="w-4 h-4 text-destructive cursor-pointer"
            onClick={() => remove(image)}
          />
        </div>
      </div>
    </>
  );
};

export default AdminSmallProductCard;
