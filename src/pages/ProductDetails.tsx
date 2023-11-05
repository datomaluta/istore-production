import Header from "../components/header/Header";
import Layout from "../components/sharedComponents/layout/Layout";
import BasketIcon from "../components/icons/BasketIcon";
import {
  generalArray,
  laptopAndAllInOneArray,
  pcArray,
} from "../data/StaticAddProductFormArray";
import Loader from "../components/sharedComponents/Loader";
import { motion } from "framer-motion";
import NotFoundComponent from "../components/sharedComponents/notFoundComponent/NotFoundComponent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addProductToCart } from "../store/cartSlice/CartSlice";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

type extraFieldType = { name: string; label: string; type: string };
type extraFieldsArrayType = Array<extraFieldType>;

const ProductDetails = () => {
  const { t } = useTranslation();
  const { id = 1, category = "pc" } = useParams();
  const [extraFieldsBasedOnCategory, setExtraFieldsBasedOnCategory] =
    useState<extraFieldsArrayType>([]);

  // const {
  //   data: productDetailsResponse,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["product", category, id],
  //   queryFn: async () => await getProductById(id),
  // });

  useEffect(() => {
    switch (category) {
      case "pc":
        setExtraFieldsBasedOnCategory(pcArray);
        break;
      case "laptop":
        setExtraFieldsBasedOnCategory(laptopAndAllInOneArray);
        break;
      case "all_in_one":
        setExtraFieldsBasedOnCategory(laptopAndAllInOneArray);
        break;
    }
  }, [category]);

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { productList } = useSelector((state: RootState) => state.dummy);

  let count = 0;

  const productData: any = productList.find((item: any) => +item.id === +id);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <Layout>
      <Header />
      {isLoading ? (
        <Loader />
      ) : productData === undefined ? (
        <NotFoundComponent />
      ) : (
        <motion.div
          initial={{ opacity: 0, translateY: -100 }}
          animate={{ opacity: 1, translateY: 0 }}
          className="py-40"
        >
          <div className="flex gap-8 px-8 lg:px-3  lg:flex-col">
            <div className="w-[33%] lg:w-[300px] sm:w-full sm:mx-auto flex-shrink-0 border-4 border-primary p-3 rounded">
              <img
                className="w-full h-full object-cover rounded"
                // src={`${import.meta.env.VITE_BACNEKD_URL}/storage/${
                //   productData?.image
                // }`}
                src={productData?.image}
                alt="this is image"
              />
            </div>
            <div className="mx-auto flex flex-col justify-between flex-1  w-full">
              <div className="border-b border-adminBgLightDark pb-12">
                <h1 className="text-2xl sm:text-xl mb-4 font-sans font-bold">
                  {productData?.label}
                </h1>
                <h3 className="text-red-500 text-3xl sm:text-2xl font-sans font-bold">
                  $ {productData?.price}
                </h3>
                <p className="mt-4 mb-6">
                  {t("stock")}: {productData?.stock}
                </p>
                <div className="flex gap-2 items-center">
                  <button
                    disabled={quantity === 1}
                    onClick={() => setQuantity((currState) => currState - 1)}
                    className="text-white bg-primary text-3xl w-10 rounded flex justify-center items-center h-10
                     disabled:bg-gray-400 disabled:cursor-not-allowed active:translate-y-1 active:bg-blue-700
                     active:shadow-lg transition-all"
                  >
                    -
                  </button>
                  <div
                    className="bg-transparent border-2 border-primary rounded w-10 h-10 text-center flex items-center justify-center"
                    defaultValue="1"
                  >
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity((currState) => currState + 1)}
                    className="text-white bg-primary text-2xl w-10 rounded flex justify-center items-center h-10 active:translate-y-1 active:bg-blue-700
                    active:shadow-lg transition-all"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() =>
                  dispatch(
                    addProductToCart({
                      quantity,
                      product: productData,
                    })
                  )
                }
                className="text-white bg-primary w-full py-3 rounded mt-10 flex items-center gap-2 justify-center "
              >
                <BasketIcon />
                {t("add_to_cart")}
              </button>
            </div>
          </div>

          <div className="px-8 md:px-3 mt-12 ">
            <h1 className="text-lg border-b-2 pb-2 px-2 border-primary w-max mb-6">
              {t("detail_info")}
            </h1>
            <table className="w-full font-sans">
              <tbody>
                {generalArray.map((item, index) => {
                  count++;
                  if (item.name === "image" || item.name === "category_id") {
                    count--;
                    return;
                  }
                  return (
                    <tr
                      key={index}
                      className={`${
                        count % 2 === 0 ? "" : "dark:bg-darkbg bg-gray-200"
                      }`}
                    >
                      <td className="p-4  w-1/2">{t(item.name)}</td>
                      <td className="p-4">
                        {productData ? productData[item.name] : ""}
                      </td>
                    </tr>
                  );
                })}
                {extraFieldsBasedOnCategory?.map((item, index) => {
                  count++;
                  console.log(item);
                  return (
                    <tr
                      key={index + Math.random()}
                      className={`${
                        count % 2 === 0 ? "" : "dark:bg-darkbg bg-gray-200"
                      }`}
                    >
                      <td className="p-4  w-1/2">{item.label}</td>
                      <td className="p-4">
                        {productData ? productData[item.name] : ""}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </Layout>
  );
};

export default ProductDetails;
