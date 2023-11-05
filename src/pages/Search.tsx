import Header from "../components/header/Header";
import Layout from "../components/sharedComponents/layout/Layout";
import { useEffect, useState } from "react";
import ProductCard from "../components/sharedComponents/productCard/ProductCard";
import { Product } from "../types/product";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Search = () => {
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search).get("query");
  const { productList } = useSelector((state: RootState) => state.dummy);
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    if (searchParam) {
      const products = productList.filter((item: any) => {
        return item.label.toLowerCase().includes(searchParam.toLowerCase());
      });
      setSearchList(products);
    }
  }, [searchParam]);

  return (
    <Layout>
      <Header />
      <div className="pt-40 pb-12 px-4">
        <div className="w-full flex flex-col min-h-screen justify-between">
          {searchList.length === 0 && (
            <p className="text-center">პროდუქტები ვერ მოიძებნა</p>
          )}
          <div
            className={`flex-grow grid gap-x-4 gap-y-8 grid-cols-4
         justify-items-center relative lg:w-full xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1  ${
           true && "min-h-[30rem]"
         }`}
          >
            {searchList?.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
