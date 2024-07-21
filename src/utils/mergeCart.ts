import { Cart } from "@/types/store/cart";

export const mergeCart = async (cartId: string, cart: Cart) => {
  const response = await fetch(
    `https://preview.invern-be.pages.dev/carts/${cartId}`,
    {
      method: "PUT",
      headers: {
        action: "merge",
        "CF-Access-Client-Id": "9a316892e7496497c4d7ac97e20a05c0.access",
        "CF-Access-Client-Secret":
          "a08859efde27988e755b742783ca4160b90bef8d494812a4df4f00b453a0b7c9",
      },
      body: JSON.stringify({
        products: cart.items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      }),
    },
  );
  if (response.status !== 200) {
    const json = await response.json();
    console.log(json.error.message);
    return false;
  }
  console.log("successfully merged cart");
  return true;
};
