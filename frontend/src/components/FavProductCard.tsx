import { HeartOff, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import LoadingButton from "./LoadingButton";
import { Button } from "./ui/button";
import { HOST } from "@/utils/constant";
import { useDeleteMyFavItems } from "@/api/favProductsApi";
type Props = {
  title: string;
  desc?: string;
  price: number;
  image: string;
  id: String;
  productId: string;
};

const FavProductCard = ({ price, title, image, id, productId }: Props) => {
  //
  const { deleteFromFav, isLoading } = useDeleteMyFavItems();

  return (
    <div className="fav_card reveal">
      <div className="container page-wrapper">
        <div className="page-inner">
          <div className="row">
            <div className="el-wrapper">
              <div className="box-up">
                <img
                  className="img w-full h-full object-cover"
                  src={`${HOST}/${image}`}
                  alt="image of the prod"
                />
                <div className="img-info">
                  <div className="info-inner">
                    <span className="p-name">{title}</span>
                    <span className="p-company">Shope Ease</span>
                  </div>
                  <div className="a-size">
                    Available sizes :{" "}
                    <span className="size">S , M , L , XL</span>
                  </div>
                </div>
              </div>

              <div className="box-down">
                <div className="h-bg">
                  <div className="h-bg-inner"></div>
                </div>

                <a className="cart" href="#">
                  <span className="price">${price}</span>
                  <span className="add-to-cart flex items-center gap-2">
                    <span className="txt">
                      <Link to={`/single-product/${productId}`}>
                        <Button variant={"ghost"}>
                          <ShoppingBag />
                        </Button>
                      </Link>
                    </span>
                    {isLoading ? (
                      <LoadingButton />
                    ) : (
                      <Button
                        variant={"ghost"}
                        onClick={async () => deleteFromFav(id as string)}
                      >
                        <HeartOff />
                      </Button>
                    )}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavProductCard;
