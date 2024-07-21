import { IProduct } from "@/types/store/product";
import { CartItem } from "@/types/store/cart";
import { Cart } from "@/types/store/cart";
import { syncCart } from "@/utils/syncCart";

export const addToCart = async ({
  product,
  cart,
  setCart,
  quantity,
  setQuantity,
}: {
  product: IProduct;
  cart: Cart;
  setCart: any;
  quantity: number;
  setQuantity: any;
}) => {
  const cartItem: CartItem = {
    id: product.productId,
    quantity,
    price: product.priceInCents,
    product: product,
  };
  let newCart;
  if (cart.items.find((cartItem) => cartItem.id === product.productId)) {
    newCart = {
      ...cart,
      items: cart.items.map((cartItem) =>
        cartItem.id === product.productId
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem,
      ),
    };
  } else {
    newCart = {
      ...cart,
      items: [...cart.items, cartItem],
    };
  }
  setCart(newCart);
  syncCart(newCart);

  if (cart.id !== "0") {
    await addToDbCart(cart.id, product.productId, quantity);
  }

  setQuantity(1);
};

export const addToDbCart = async (
  cartId: string,
  productId: string,
  quantity: number,
) => {
  const response = await fetch(
    `https://preview.invern-be.pages.dev/carts/${cartId}`,
    {
      method: "PUT",
      headers: {
        action: "add",
        "CF-Access-Client-Id": "9a316892e7496497c4d7ac97e20a05c0.access",
        "CF-Access-Client-Secret":
          "a08859efde27988e755b742783ca4160b90bef8d494812a4df4f00b453a0b7c9",
      },
      body: JSON.stringify({
        productId,
        quantity,
      }),
    },
  );
  if (response.status !== 200) {
    const json = await response.json();
    console.log("failed to add to cart: ", json.error.message);
  }
};
