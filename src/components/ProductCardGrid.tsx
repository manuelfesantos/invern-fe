import React from "react";
import ProductCard from "./ProductCard";
import { IProduct } from "@/types/store/product";

const ProductCardGrid = ({ products }: { products: IProduct[] }) => {
  return products.length > 0 ? (
    <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-12 place-items-center my-4 px-12 lg:px-36">
      {products.map((item, index) => (
        <div key={index}>
          <ProductCard product={item} />
        </div>
      ))}
    </div>
  ) : (
    <div className="w-full h-full flex justify-center items-center">
      <h2>No Products Found</h2>
    </div>
  );
};

export default ProductCardGrid;
