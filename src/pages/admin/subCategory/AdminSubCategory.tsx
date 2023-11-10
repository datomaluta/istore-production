import { Link, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../../components/admin/adminLayout/AdminLayout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { truncateText } from "../../../helpers/TextTrimmer";
import EditIcon from "../../../components/icons/EditIcon";
import DeleteIcon from "../../../components/icons/DeleteIcon";
import { Product } from "../../../types/product";
import BagPlusIcon from "../../../components/icons/BagPlusIcon";
import { useTranslation } from "react-i18next";
import { deleteProduct } from "../../../../services/product";
import { customAxiosError } from "../../../components/auth/signUp/types";
import Loader from "../../../components/sharedComponents/Loader";
import Alert from "../../../components/sharedComponents/alert/Alert";
import ModalDiv from "../../../components/sharedComponents/animatedComponents/modalDiv/ModalDiv";
import { AnimatePresence } from "framer-motion";
import LoaderDots from "../../../components/sharedComponents/LoaderDots";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { deleteProductFromDummy } from "../../../store/dummySlice/DummySlice";

const AdminSubCategory = () => {
  const { category, subCategory, page } = useParams();
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteModalIsVisible, setDeleteModalIsVisible] =
    useState<boolean>(false);

  const [chosenProduct, setChosenProduct] = useState<any>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) {
      if (+page === +1) {
        setCurrentPage(1);
      }
    }
  }, [page]);

  // const { data: productsQuery, isLoading } = useQuery({
  //   queryKey: ["computers", subCategory, currentPage],
  //   queryFn: () => getCategoryAllProducts(subCategory || "pc", currentPage),
  // });

  useEffect(() => {
    navigate(`/admin/${category}/${subCategory}/page/${currentPage}`);
  }, [currentPage, navigate, subCategory, category]);

  const editHandler = (id: number) => {
    navigate(`/admin/product/${id}/edit`);
  };

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      setSuccessMessage("პროდუქტი წარმატებით წაიშალა");
      setTimeout(() => {
        setSuccessMessage("");
      }, 1500);

      queryClient.invalidateQueries([category, subCategory, currentPage]);
      setDeleteModalIsVisible(false);
    },
    onError: (error: customAxiosError) => {
      console.log(error);
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const { productList } = useSelector((state: RootState) => state.dummy);

  return (
    <AdminLayout>
      <>
        <AnimatePresence>
          {deleteModalIsVisible && (
            <ModalDiv setModalIsVisible={setDeleteModalIsVisible}>
              <div>
                <h1 className="text-lg text-center font-bold border-b border-gray-600 pb-4">
                  {t("product_delete")}
                </h1>
                <p className="text-center mt-8">
                  {t("are_you_sure_product_delete")}
                </p>
                <div className="mt-10 flex justify-between">
                  <button
                    onClick={() => setDeleteModalIsVisible(false)}
                    className="bg-red-700 px-4 py-2 rounded font-bold text-white"
                  >
                    {t("back_short")}
                  </button>
                  <button
                    onClick={() => {
                      // deleteProductMutation.mutate(chosenProduct?.id);
                      // setData(
                      //   dummyData[subCategory].filter(
                      //     (item: any) => item.id !== chosenProduct.id
                      //   )
                      // );

                      dispatch(deleteProductFromDummy(chosenProduct.id));
                      setDeleteModalIsVisible(false);
                    }}
                    className="bg-green-600 px-4 py-2 rounded font-bold text-white min-w-[72px] flex justify-center items-center"
                  >
                    {deleteProductMutation.isLoading ? (
                      <LoaderDots />
                    ) : (
                      t("yes")
                    )}
                  </button>
                </div>
              </div>
            </ModalDiv>
          )}
        </AnimatePresence>
      </>

      <Alert message={successMessage} />
      <div className="flex justify-end items-center mb-4">
        <Link
          to={`/admin/product/add/${subCategory}`}
          className="bg-emerald-600 px-4 py-2 rounded-lg font-bpg flex gap-1 items-center text-white"
        >
          <BagPlusIcon />
          {t("add")}
        </Link>
      </div>
      <div className="w-full max-w-screen-lg min-h-[40rem] mx-auto p-4 md:px-2 shadow-lg flex flex-col justify-between ">
        {isLoading ? (
          <Loader />
        ) : (
          <table className="min-w-full dark:bg-adminBgLightDark bg-white border-collapse border  rounded overflow-hidden">
            <thead className="">
              <tr>
                <th className="px-6 md:px-2 py-3 font-arial  bg-adminBgDark text-left text-xs leading-4 font-medium text-gray-300 uppercase tracking-wider">
                  {t("image")}
                </th>
                <th className="px-6 v py-3  bg-adminBgDark text-left text-xs leading-4 font-medium text-gray-300 uppercase tracking-wider">
                  {t("name")}
                </th>
                <th className="px-6 md:px-2 py-3 md:hidden  bg-adminBgDark text-left text-xs leading-4 font-medium text-gray-300 uppercase tracking-wider">
                  {t("stock")}
                </th>
                <th className="px-6 md:px-2 py-3  bg-adminBgDark text-left text-xs leading-4 font-medium text-gray-300 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {productList
                .filter((item: any) => item.category_name === subCategory)
                .map((product: Product) => (
                  <tr key={product.id} className="text-sm">
                    <td className="px-6 md:px-2 py-4 whitespace-no-wrap border-b border-gray-300">
                      <img
                        // src={`${import.meta.env.VITE_BACNEKD_URL}/storage/${
                        //   product?.image
                        // }`}
                        srcSet={product?.image}
                        alt="Image Alt Text"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 md:px-2 md:text-xs py-4 whitespace-no-wrap border-b border-gray-300">
                      {truncateText(product.label, 40)}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 md:hidden">
                      {product.stock}
                    </td>
                    <td className="px-6 md:px-2 py-4 whitespace-no-wrap border-b border-gray-300">
                      <div className="flex gap-3 justify-end">
                        <button
                          onClick={() => editHandler(product.id)}
                          className="border p-1 rounded-full border-green-500"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => {
                            setChosenProduct(product);
                            setDeleteModalIsVisible(true);
                          }}
                          className="border p-1 rounded-full border-red-500"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}

        {/* {productsQuery?.data && (
          <Pagination
            hrefSegment={`/admin/computers/${subCategory}`}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            total={productsQuery?.data.last_page}
          />
        )} */}
      </div>
    </AdminLayout>
  );
};

export default AdminSubCategory;
