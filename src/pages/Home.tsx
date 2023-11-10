import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import BigSlider from "../components/homeComponents/bigSlider/BigSlider";
import DiscountSlider from "../components/homeComponents/discountSlider/DiscountSlider";
import Features from "../components/homeComponents/features/Features";
import TestimonialLayout from "../components/homeComponents/testimonial/TestimonialLayour";
import { motion } from "framer-motion";
import Layout from "../components/sharedComponents/layout/Layout";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Header />

      <motion.div
        className=" pt-40 lg:pt-36 px-4 pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        <BigSlider />
        <Features />
        <div className="mt-20 flex justify-center flex-col items-center">
          <h1 className="text-lg text-center mb-8 max-w-max border-b-2 border-primary pb-1">
            {t("offers")}
          </h1>
          <DiscountSlider />
        </div>

        <TestimonialLayout />
      </motion.div>
      <Footer />
    </Layout>
  );
};

export default Home;
