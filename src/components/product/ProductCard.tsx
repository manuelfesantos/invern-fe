import React from "react";
import ProductComponents from "./ProductComponents";
import { IProduct } from "@/types/store/product";

const ProductCard = ({
  product,
  disableButtons,
  amountOrdered,
}: {
  product: IProduct;
  disableButtons?: boolean;
  amountOrdered?: number;
}) => {
  return (
    <ProductComponents
      disableButtons={disableButtons}
      product={product}
      component="productCard"
      amountOrdered={amountOrdered}
    >
      <></>
    </ProductComponents>
  );
};

export default ProductCard;
