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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

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

  const total = cart.products.reduce(
    (acc, item) => acc + item.quantity * item.priceInCents,
    0,
  );

  const gridClasses = cart.products.length > 3 ? 'grid-cols-2 max-h-[50vh] overflow-scroll' : 'grid-cols-1';

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      {loading && <Loading />}
      <div className="h-full w-full lg:h-[550px] lg:w-[500px] flex flex-col items-center justify-center px-12 lg:px-6 lg:bg-[#4C4B48] bg-opacity-95 lg:card-shadow">
        <div>
          <ul className="flex my-2">
            <li>
              <h3 className="p-4 border-b-2">Shopping Cart</h3>
            </li>
          </ul>
        </div>
        <div className="flex flex-col flex-grow gap-2 mt-4 w-full items-center flex-start overflow-scroll">
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
                        <FontAwesomeIcon icon={faXmark} size='lg' />
                      </CustomLink>
                    </div>
                  </div>
                ))

          )}
        </div>
        <div className="w-full flex flex-col gap-2 mb-4">
          <hr />
          <div className="flex w-full flex-grow justify-between">
            <div className="flex flex-col gap-2">
              <h5>Subtotal: </h5>
            </div>
            <div className="flex flex-col gap-2">
              <h4>{total}€</h4>
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
