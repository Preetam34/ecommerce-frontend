import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import HeaderWithoutNav from "../../components/HeaderWithoutNav";
import ProductPage from "../ProductListPage";

const LandingPage = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);


  return (
    <>
      <HeaderWithoutNav />
      <ProductPage />
      <Footer />
    </>
  );
};

export default LandingPage;
