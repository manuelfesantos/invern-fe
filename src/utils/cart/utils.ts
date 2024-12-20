import { Cart, CartItem } from "@/types/store/cart";

export const cartContainsProduct = (cart: Cart, productId: string) =>
  cart.products.some(({ id }) => productId === id);

export const getProductFromCart = (cart: Cart, productId: string) =>
  cart.products.find(({ id }) => productId === id);

export const removeProductFromCart = (cart: Cart, productId: string) => ({
  ...cart,
  products: cart.products.filter(({ id }) => productId !== id),
});

export const decreaseProductQuantity = (
  cart: Cart,
  productId: string,
  quantity: number,
) => ({
  ...cart,
  products: cart.products.map((product) => {
    if (product.id === productId) {
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
  productId: string,
  quantity: number,
) => ({
  ...cart,
  products: cart.products.map((product) => {
    if (product.id === productId) {
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
