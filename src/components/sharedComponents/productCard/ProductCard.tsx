import { Link } from "react-router-dom";
import { ProductCardPropsType } from "./types";
import { motion } from "framer-motion";

import { truncateText } from "../../../helpers/TextTrimmer";
import BasketIcon from "../../icons/BasketIcon";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../../store/cartSlice/CartSlice";

const ProductCard = ({ product }: ProductCardPropsType) => {
  // const [productCategory, setProductCategory] = useState<categoryType>();
  // const { isLoading } = useQuery({
  //   queryKey: ["category_info"],
  //   queryFn: () => getCategoryById(product?.category_id),
  //   onSuccess: (data) => {
  //     setProductCategory(data?.data);
  //   },
  // });

  const dispatch = useDispatch();

  return (
    <motion.div
      className="w-full rounded overflow-hidden border-greyForBorder dark:border-greyforText border
     dark:bg-neutral-800  bg-white h-[420px] md:w-[80%] sm:w-full shadow-md transition-all hover:dark:bg-neutral-700 hover:bg-neutral-100 group"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="px-2 pt-2 pb-4 block h-full ">
        <Link
          to={`/product/${product?.category_name}/${product?.id}`}
          className="w-full block h-[70%] bg-blue-500 overflow-hidden rounded border border-greyForBorder dark:border-none"
        >
          <motion.img
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            // src={`${import.meta.env.VITE_BACNEKD_URL}/storage/${
            //   product?.image
            // }`}
            src={product?.image}
            alt="imgpreview"
            className="rounded w-full h-full object-cover"
          />
        </Link>
        <div className="flex flex-col gap-4">
          <p className="h-12 mt-4 font-sans">
            {truncateText(product?.label, 50)}
          </p>
          <div className="flex justify-between items-center">
            <p className="font-bold text-lg text-right font-sans">
              {product?.price}$
            </p>
            <button
              onClick={() => {
                dispatch(addProductToCart({ quantity: 1, product: product }));
              }}
              className="bg-primary h-8 w-8 rounded flex justify-center items-center"
              type="button"
            >
              <BasketIcon className="h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
