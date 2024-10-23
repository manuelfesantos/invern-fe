import React from "react";
import Layout from "@/components/global/Layout";
import { getProducts } from "@/utils/getFromDb";
import ProductCardGrid from "@/components/product/ProductCardGrid";

const Products = async () => {
  const products = await getProducts();

  return (
    <Layout>
      <section className="relative h-full w-full flex flex-col overflow-scroll">
        <div className="h-12 lg:h-36 w-full my-6 lg:my-12 flex flex-col items-center justify-center">
          <h2>Products</h2>
        </div>
        {products.length === 0 ? (
          <div className="absolute h-full w-full flex items-center justify-center px-24">
            <p>{`There are no products available at the moment.`}</p>
          </div>
        ) : (
          <ProductCardGrid products={products} />
        )}
      </section>
    </Layout>
  );
};

export default Products;
