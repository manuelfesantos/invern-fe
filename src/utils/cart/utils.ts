import { Cart, CartItem } from "@/types/store/cart";

export const cartContainsProduct = (cart: Cart, id: string) =>
  cart.products.some(({ productId }) => productId === id);

export const getProductFromCart = (cart: Cart, id: string) =>
  cart.products.find(({ productId }) => productId === id);

export const removeProductFromCart = (cart: Cart, id: string) => ({
  ...cart,
  products: cart.products.filter(({ productId }) => productId !== id),
});

export const decreaseProductQuantity = (
  cart: Cart,
  id: string,
  quantity: number,
) => ({
  ...cart,
  products: cart.products.map((product) => {
    if (product.productId === id) {
      return {
        ...product,
        quantity: product.quantity - quantity,
      };
    }
    return product;
  }),
});

export const increaseProductQuantity = (
  cart: Cart,
  id: string,
  quantity: number,
) => ({
  ...cart,
  products: cart.products.map((product) => {
    if (product.productId === id) {
      return {
        ...product,
        quantity: product.quantity + quantity,
      };
    }
    return product;
  }),
});

export const addProductToCart = (cart: Cart, product: CartItem) => ({
  ...cart,
  products: [...cart.products, product],
});

export const cartExistsInBackend = (cart: Cart) => cart.cartId !== "";
