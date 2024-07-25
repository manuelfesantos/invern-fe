import { IProduct, IProductDetails } from "@/types/store/product";
import { CartItem } from "@/types/store/cart";

export const getCartItemFromProduct = (
  product: IProductDetails | IProduct,
  quantity: number,
): CartItem => ({
  ...product,
  quantity,
});
