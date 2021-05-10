import React from "react";

import ProductGrid from "../components/ProductGrid";
import ContextProvider from "../features/store/provider/ContextProvider";
import Layout from "../layouts";
import { Container } from "../utils/styles";

const CartPage = () => {
  const HighlyBelowAvg = require("../images/home/HighlyBelowAvg.png");
  return (
    <Layout>
      <ContextProvider>
        <div className="grid grid-flow-row">
          <div
            className="w-full h-screen full-bleed grid grid-cols-2 grid-rows-2 px-8 py-8 bg-cover"
            style={{ backgroundImage: `url(${HighlyBelowAvg})` }}
          />

          <div className="-mt-96 z-30">
            <ProductGrid />
          </div>
        </div>
      </ContextProvider>
    </Layout>
  );
};

export default CartPage;
