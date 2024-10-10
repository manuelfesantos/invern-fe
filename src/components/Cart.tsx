"use client";
import React, { useLayoutEffect } from "react";
import { Context } from "react";
import { CustomButton, CustomLink } from "./CustomComponents";
import { useState, useContext } from "react";
import { CartContext } from "@/context/cart";
import { cartContext } from "@/context/cart";
import Image from "next/image";
import Loading from "./Loading";
import { CartItem } from "@/types/store/cart";
import { checkout } from "@/service/checkout";
import { ActionType, updateCart } from "@/utils/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { convertPrice } from "@/utils/convertToCents";
import { countryContext, CountryContext } from "@/context/country";
import { getCart } from "@/service/cart";
import { ConfigContext, configContext } from "@/context/config";
import { userContext, UserContext } from "@/context/user";
import { ToastContext, toastContext } from "@/context/toast";
import { useRouter } from "next/navigation";

const Cart = () => {
  const { cart, setCart } = useContext<CartContext>(
    cartContext as Context<CartContext>,
  );
  const { country } = useContext<CountryContext>(
    countryContext as Context<CountryContext>,
  );
  const { user } = useContext<UserContext>(userContext as Context<UserContext>);
  const { configIsLoaded } = useContext<ConfigContext>(configContext);
  const [loading, setLoading] = useState(false);
  const [cartIsLoaded, setCartIsLoaded] = useState(false);
  const { handleToast } = useContext(toastContext as Context<ToastContext>);
  const router = useRouter();

  const changeQuantity = async (adding: boolean, product: CartItem) => {
    const productToChange = { ...product, quantity: 1 };
    if (adding) {
      const [error] = await updateCart({
        products: [productToChange],
        cart,
        setCart,
        action: ActionType.ADD,
        loggedIn: user !== null,
      });
      if (error) {
        handleToast(false, error);
        return;
      }

      handleToast(true, "Product added to cart!");
    } else {
      const [error] = await updateCart({
        products: [productToChange],
        cart,
        setCart,
        action: ActionType.REMOVE,
        loggedIn: user !== null,
      });
      if (error) {
        handleToast(false, error);
        return;
      }

      handleToast(true, "Product removed from cart!");
    }
  };

  const removeProductFromCart = async (product: CartItem) => {
    const [error] = await updateCart({
      products: [product],
      cart,
      setCart,
      action: ActionType.REMOVE,
      loggedIn: user !== null,
    });
    if (error) {
      handleToast(false, error);
      return;
    }

    handleToast(true, "Product removed from cart!");
  };

  const handleCheckout = async () => {
    setLoading(true);

    const [error, response] = await checkout(
      cart.products.map(({ productId, quantity }) => ({
        productId,
        quantity,
      })),
    );
    if (error) {
      handleToast(false, error);
      setLoading(false);
      return;
    }
    if (response?.url) {
      setLoading(false);
      return response?.url;
    }
  };

  const isCheckoutDisabled = (): boolean => {
    return (
      !cart.products?.length ||
      !!cart.products.find((product) => product.stock === 0)
    );
  };

  const redirectCheckout = () => {
    handleCheckout().then((url) => {
      if (url) {
        window.location.href = url;
      }
    });
  };

  const total = country
    ? convertPrice(
        cart.products?.reduce(
          (acc, item) => acc + item.quantity * item.priceInCents,
          0,
        ),
        country.taxes,
      )
    : "loading...";

  useLayoutEffect(() => {
    if (cart.products?.length === 0 || !configIsLoaded || cartIsLoaded) {
      if (cartIsLoaded) console.log("not fetching cart because cart is loaded");
      if (!configIsLoaded)
        console.log("not fetching cart because config is not loaded");
      if (cart.products?.length === 0)
        console.log("not fetching cart because cart has no products");
      return;
    }
    const handleGetCart = async () => {
      const [error, data] = await getCart(cart.products);
      if (error) {
        handleToast(false, error);
        return;
      }
      const { cart: newCart } = data || {};
      console.log("newCart:", newCart);
      if (newCart) {
        localStorage.setItem("cart", JSON.stringify(newCart));
        setCart(newCart);
        setCartIsLoaded(true);
      }
    };

    handleGetCart();
  }, [configIsLoaded]);

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
          {cart.products?.length === 0 ? (
            <p>{`There's no items in the shopping cart.`}</p>
          ) : (
            cart.products?.map((product, index) => (
              <div key={index} className="flex gap-2">
                <div
                  onClick={() =>
                    router.push(`/shop/products/${product.productId}`)
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
                {product.stock > 0 ? (
                  <div className="px-4 pb-4 pt-2">
                    <h5>{product.productName}</h5>
                    <div className="flex items-center justify-between">
                      <p>
                        Price:{" "}
                        {country
                          ? convertPrice(product.priceInCents, country.taxes)
                          : "loading..."}
                        {country && "€"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p>Quantity:</p>
                      <CustomButton
                        position="h-6 w-6"
                        type="button"
                        onClick={async () =>
                          await changeQuantity(false, product)
                        }
                      >
                        -
                      </CustomButton>
                      <p>{product.quantity}</p>
                      <CustomButton
                        position="h-6 w-6"
                        type="button"
                        onClick={async () =>
                          await changeQuantity(true, product)
                        }
                        isDisabled={() => product.quantity >= product.stock}
                      >
                        +
                      </CustomButton>
                    </div>
                  </div>
                ) : (
                  <div className="px-4 pb-4 pt-2">
                    <h5>{product.productName}</h5>
                    <p className="text-red-400">Sold Out</p>
                  </div>
                )}
                <div className="flex items-center">
                  <CustomLink
                    position="block py-4 w-full text-right"
                    onClick={async () => await removeProductFromCart(product)}
                    href=""
                  >
                    <FontAwesomeIcon icon={faXmark} size="lg" />
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
              <h4>
                {total}
                {country && "€"}
              </h4>
            </div>
          </div>
          <hr />
          <div>
            <CustomButton
              position="w-full py-2"
              type="button"
              onClick={redirectCheckout}
              isDisabled={isCheckoutDisabled}
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
