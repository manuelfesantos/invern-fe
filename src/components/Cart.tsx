"use client";
import React from "react";
import { Context } from "react";
import { CustomButton, CustomLink } from "./CustomComponents";
import { useState, useContext } from "react";
import { CartContext } from "@/context/cart";
import { cartContext } from "@/context/cart";
import Image from "next/image";
import Loading from "./Loading";
import { syncCart } from "@/utils/syncCart";
import { addToDbCart } from "@/utils/addToCart";
import { removeFromDbCart } from "@/utils/removeFromCart";
import { CartItem } from "@/types/store/cart";

const Cart = () => {
  const { cart, setCart } = useContext<CartContext>(
    cartContext as Context<CartContext>,
  );
  const [loading, setLoading] = useState(false);

  const changeQuantity = async (adding: boolean, productId: string) => {
    if (adding) {
      const newCart = {
        ...cart,
        items: cart.items.map((cartItem) =>
          cartItem.id === productId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      };
      setCart(newCart);
      syncCart(newCart);
      if (cart.id !== "0") {
        await addToDbCart(cart.id, productId, 1);
      }
    } else {
      const cartItem = getCartItemById(productId);
      if (cartItem?.quantity === 1) {
        await removeProductFromCart(cartItem);
      } else {
        const newCart = {
          ...cart,
          items: cart.items.map((item) =>
            item.id === productId
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item,
          ),
        };
        setCart(newCart);
        syncCart(newCart);
        if (cart.id !== "0") {
          await removeFromDbCart(cart.id, productId, 1);
        }
      }
    }
  };

  const removeProductFromCart = async (product: CartItem) => {
    const newCart = {
      ...cart,
      items: cart.items.filter((item) => item.id !== product.id),
    };
    setCart(newCart);
    syncCart(newCart);
    if (cart.id !== "0") {
      await removeFromDbCart(cart.id, product.id, product.quantity);
    }
  };

  const getCartItemById = (id: string) => {
    return cart.items.find((item) => item.id === id);
  };

  const checkout = async () => {
    setLoading(true);
    const response = await (
      await fetch("https://preview.invern-be.pages.dev/checkout", {
        body: JSON.stringify({
          products: cart.items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        }),
        method: "POST",
        headers: {
          ...(cart.id !== "0" && { cartId: cart.id }),
          "CF-Access-Client-Id": "9a316892e7496497c4d7ac97e20a05c0.access",
          "CF-Access-Client-Secret":
            "a08859efde27988e755b742783ca4160b90bef8d494812a4df4f00b453a0b7c9",
        },
      })
    ).json();
    setLoading(false);
    return response.data.url;
  };

  const redirectCheckout = () => {
    checkout().then((url) => {
      window.location.replace(url);
    });
  };

  const subTotal = cart.items.reduce(
    (acc, item) => acc + item.quantity * item.product.priceInCents,
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
          {cart.items.length === 0 ? (
            <p>{`There's no items in the shopping cart.`}</p>
          ) : (
            cart.items.map((item, index) => (
              <div key={index} className="flex gap-2">
                <div
                  onClick={() => location.replace(`/shop/products/${item.id}`)}
                  className="cursor-pointer"
                >
                  <Image
                    src={item.product.images[0].url}
                    height={100}
                    width={100}
                    alt={item.product.images[0].alt}
                    className="h-24 w-24 object-cover aspect-square"
                  />
                </div>
                <div className="px-4 pb-4 pt-2">
                  <h5>{item.product.productName}</h5>
                  <div className="flex items-center justify-between">
                    <p>Price: {item.product.priceInCents}€</p>
                  </div>
                  <div className="flex gap-2">
                    <p>Quantity:</p>
                    <CustomButton
                      position="h-6 w-6"
                      type="button"
                      onClick={async () => await changeQuantity(false, item.id)}
                    >
                      -
                    </CustomButton>
                    <p>{item.quantity}</p>
                    <CustomButton
                      position="h-6 w-6"
                      type="button"
                      onClick={async () => await changeQuantity(true, item.id)}
                      isDisabled={() => item.quantity >= item.product.stock}
                    >
                      +
                    </CustomButton>
                  </div>
                </div>
                <div className="flex items-center">
                  <CustomLink
                    position="block py-4 w-full text-right"
                    onClick={async () => await removeProductFromCart(item)}
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
