"use client";
import React from "react";
import { Context } from "react";
import { CustomButton, CustomLink } from "./CustomComponents";
import { useState, useContext } from "react";
import { CartContext } from "@/context/cart";
import { cartContext } from "@/context/cart";
import Image from "next/image";
import Loading from "./Loading";
import { CartItem } from "@/types/store/cart";
import { checkoutService } from "@/service/checkout";
import { ActionType, updateCart } from "@/utils/cart";

const Cart = () => {
  const { cart, setCart } = useContext<CartContext>(
    cartContext as Context<CartContext>,
  );
  const [loading, setLoading] = useState(false);

  const changeQuantity = async (adding: boolean, product: CartItem) => {
    const productToChange = { ...product, quantity: 1 };
    if (adding) {
      await updateCart({
        products: [productToChange],
        cart,
        cartId: cart.cartId,
        setCart,
        action: ActionType.ADD,
      });
    } else {
      await updateCart({
        products: [productToChange],
        cart,
        cartId: cart.cartId,
        setCart,
        action: ActionType.REMOVE,
      });
    }
  };

  const removeProductFromCart = async (product: CartItem) => {
    await updateCart({
      products: [product],
      cart,
      cartId: cart.cartId,
      setCart,
      action: ActionType.REMOVE,
    });
  };

  const checkout = async () => {
    setLoading(true);
    const response = await checkoutService(
      cart.products.map(({ productId, quantity }) => ({
        productId,
        quantity,
      })),
      cart.cartId,
    );
    setLoading(false);
    return response.data.url;
  };

  const redirectCheckout = () => {
    checkout().then((url) => {
      window.location.assign(url);
    });
  };

  const subTotal = cart.products.reduce(
    (acc, item) => acc + item.quantity * item.priceInCents,
    0,
  );

  const shipping = 0;

  const total = subTotal + shipping;

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center flex-grow">
      {loading && <Loading />}
      <div className="h-[80%] flex-grow lg:mx-24 flex flex-col items-center p-6 lg:bg-[#4C4B48] bg-opacity-95 lg:card-shadow">
        <div className="">
          <ul className="flex mb-6">
            <li>
              <h3 className="p-4 border-b-2">Shopping Cart</h3>
            </li>
          </ul>
        </div>
        <div className="flex flex-col flex-grow gap-2 items-center justify-center">
          {cart.products.length === 0 ? (
            <p>{`There's no items in the shopping cart.`}</p>
          ) : (
            cart.products.map((product, index) => (
              <div key={index} className="flex gap-2">
                <div
                  onClick={() =>
                    location.replace(`/shop/products/${product.productId}`)
                  }
                  className="cursor-pointer"
                >
                  <Image
                    src={product.images[0].url}
                    height={100}
                    width={100}
                    alt={product.images[0].alt}
                    className="h-24 w-24 object-cover aspect-square"
                  />
                </div>
                <div className="px-4 pb-4 pt-2">
                  <h5>{product.productName}</h5>
                  <div className="flex items-center justify-between">
                    <p>Price: {product.priceInCents}€</p>
                  </div>
                  <div className="flex gap-2">
                    <p>Quantity:</p>
                    <CustomButton
                      position="h-6 w-6"
                      type="button"
                      onClick={async () => await changeQuantity(false, product)}
                    >
                      -
                    </CustomButton>
                    <p>{product.quantity}</p>
                    <CustomButton
                      position="h-6 w-6"
                      type="button"
                      onClick={async () => await changeQuantity(true, product)}
                      isDisabled={() => product.quantity >= product.stock}
                    >
                      +
                    </CustomButton>
                  </div>
                </div>
                <div className="flex items-center">
                  <CustomLink
                    position="block py-4 w-full text-right"
                    onClick={async () => await removeProductFromCart(product)}
                    href=""
                  >
                    Remove
                  </CustomLink>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="h-[80%] w-96 mr-12 flex flex-col items-center justify-center py-12 bg-[#4C4B48] shadow-lg drop-shadow-lg shadow-[#201F1D]">
        <div className="w-[80%] flex flex-col gap-6">
          <h3>Summary:</h3>
          <hr />
          <div className="flex w-full flex-grow justify-between">
            <div className="flex flex-col gap-2">
              <p>Subtotal: </p>
              <p>Shipping: </p>
            </div>
            <div className="flex flex-col gap-2">
              <p>{subTotal}</p>
              <p>{shipping}</p>
            </div>
          </div>
          <hr />
          <div className="flex w-full flex-grow justify-between">
            <div className="flex flex-col gap-2">
              <h3>Total: </h3>
            </div>
            <div className="flex flex-col gap-2">
              <h3>{total}</h3>
            </div>
          </div>
          <hr />
          <div>
            <CustomButton
              position="w-full py-2"
              type="button"
              onClick={redirectCheckout}
            >
              checkout
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
