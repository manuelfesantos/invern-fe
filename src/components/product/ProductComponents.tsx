"use client";
import React, { useState, useContext, Context, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CartContext, cartContext } from "@/context/cart";
import { WishListContext, wishListContext } from "@/context/wishList";
import { IProduct } from "@/types/store/product";
import { CustomButton } from "../custom/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { WishList } from "@/types/store/wishList";
import { ReactNode } from "react";
import { ToastContext, toastContext } from "@/context/toast";
import { ActionType, updateCart } from "@/utils/cart";
import { getCartItemFromProduct } from "@/utils/product/utils";
import { convertPrice } from "@/utils/convertToCents";
import { countryContext, CountryContext } from "@/context/country";
import { userContext, UserContext } from "@/context/user";
import { getStock } from "@/service/stock";
import { Skeleton, Typography } from "@mui/material";

const ProductComponents = ({
  children,
  product,
  component,
  disableButtons,
  amountOrdered,
}: {
  children: ReactNode;
  product: IProduct;
  component: string;
  disableButtons?: boolean;
  amountOrdered?: number;
}) => {
  const { cart, setCart } = useContext<CartContext>(
    cartContext as Context<CartContext>,
  );
  const { user } = useContext(userContext) as UserContext;
  const { wishList, setWishList } = useContext<WishListContext>(
    wishListContext as Context<WishListContext>,
  );
  const [quantity, setQuantity] = useState(1);
  const { handleToast } = useContext(toastContext as Context<ToastContext>);
  const [stock, setStock] = useState<number | null>(null);

  const { country } = useContext(countryContext) as CountryContext;

  const add = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const reduce = () => {
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const toggleLike = () => {
    if (
      wishList.products.find((item) => item.productId === product.productId)
    ) {
      setWishList((prevWishList: WishList) => ({
        products: prevWishList.products.filter(
          (item) => item.productId !== product.productId,
        ),
      }));
      handleToast(true, "Product removed from wishlist!");
    } else {
      setWishList((prevWishList: WishList) => ({
        products: [...prevWishList.products, product],
      }));
      handleToast(true, "Product added to wishlist!");
    }
  };

  useEffect(() => {
    getStock(product.productId).then((stock) => setStock(stock));
  }, []);

  if (component === "productCard") {
    return (
      <>
        <div className="w-full bg-[#4C4B48] card-shadow hover:scale-105 transition-all duration-300">
          <div className="relative">
            <div>
              <Link href={`/shop/products/${product.productId}`}>
                <Image
                  src={product.images[0].url}
                  height={100}
                  width={100}
                  alt={product.images[0].alt}
                  className="h-72 w-full object-cover aspect-square"
                />
              </Link>
            </div>
            {!disableButtons && (
              <div
                className="absolute top-2 right-4 cursor-pointer icon-scale"
                onClick={toggleLike}
              >
                {wishList.products.find(
                  (item) => item.productId === product.productId,
                ) ? (
                  <FontAwesomeIcon icon={solidHeart} size="xl" />
                ) : (
                  <FontAwesomeIcon icon={regularHeart} size="xl" />
                )}
              </div>
            )}
            <div className="px-4 pb-4 pt-2">
              <div
                className={`flex items-center ${disableButtons ? "justify-center" : "justify-between"} mb-2`}
              >
                {disableButtons ? (
                  <h3>{product.productName}</h3>
                ) : (
                  <h5>{product.productName}</h5>
                )}
                {!disableButtons && (
                  <div className="flex gap-2">
                    <CustomButton
                      position="h-6 w-6"
                      type="button"
                      onClick={reduce}
                      isDisabled={() => quantity <= 1}
                    >
                      -
                    </CustomButton>
                    <p>{quantity}</p>
                    <CustomButton
                      position="h-6 w-6"
                      type="button"
                      onClick={add}
                      isDisabled={() =>
                        quantity +
                          (cart.products.find(
                            (item) => item.productId === product.productId,
                          )?.quantity || 0) >=
                        (stock || 0)
                      }
                    >
                      +
                    </CustomButton>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold justify-self-center">
                  {country
                    ? convertPrice(product.priceInCents, country.taxes)
                    : " "}
                  {country && "€"}
                </h3>
                {amountOrdered && (
                  <h3 className="text-gray-400">x{amountOrdered}</h3>
                )}
                {!disableButtons &&
                  (stock === 0 ? (
                    <div className="px-4 py-2">
                      <h4 className="font-extrabold text-red-400">Sold Out</h4>
                    </div>
                  ) : (
                    <CustomButton
                      position="px-4 py-2"
                      type="button"
                      onClick={async () => {
                        const [error] = await updateCart({
                          products: [getCartItemFromProduct(product, quantity)],
                          cart,
                          setCart,
                          setQuantity,
                          action: ActionType.ADD,
                          loggedIn: user !== null,
                        });

                        if (error) {
                          handleToast(false, error);
                          return;
                        }

                        handleToast(true, "Product added to cart!");
                      }}
                      isDisabled={() =>
                        quantity +
                          (cart.products.find(
                            (cartItem) =>
                              cartItem.productId === product.productId,
                          )?.quantity || 0) >
                        (stock || 0)
                      }
                    >
                      add to cart
                    </CustomButton>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-col">
          <h1 className="hidden lg:block">{product.productName}</h1>
          <h2 className="lg:hidden">{product.productName}</h2>
          <div className="flex justify-between">
            <h2 className="lg:px-2">
              {country
                ? convertPrice(product.priceInCents, country?.taxes)
                : " "}
              {country && "€"}
            </h2>
            <div
              className="hidden lg:block cursor-pointer icon-scale"
              onClick={toggleLike}
            >
              {wishList.products.find(
                (item) => item.productId === product.productId,
              ) ? (
                <FontAwesomeIcon icon={solidHeart} size="3x" />
              ) : (
                <FontAwesomeIcon icon={regularHeart} size="3x" />
              )}
            </div>
            <div
              className="lg:hidden cursor-pointer icon-scale"
              onClick={toggleLike}
            >
              {wishList.products.find(
                (item) => item.productId === product.productId,
              ) ? (
                <FontAwesomeIcon icon={solidHeart} size="2x" />
              ) : (
                <FontAwesomeIcon icon={regularHeart} size="2x" />
              )}
            </div>
          </div>
        </div>
        <div className="my-2">
          <hr />
        </div>
        {children}
        <div className="flex gap-4 px-2">
          <div className="flex gap-4">
            <CustomButton
              position="h-6 w-6 lg:h-8 lg:w-8"
              type="button"
              onClick={reduce}
              isDisabled={() => quantity <= 1}
            >
              -
            </CustomButton>
            <h4>{quantity}</h4>
            <CustomButton
              position="h-6 w-6 lg:h-8 lg:w-8"
              type="button"
              onClick={add}
              isDisabled={() =>
                quantity +
                  (cart.products.find(
                    (cartItem) => cartItem.productId === product.productId,
                  )?.quantity || 0) >=
                (stock || 0)
              }
            >
              +
            </CustomButton>
          </div>
          <p className="text-base lg:text-lg">Available: {stock}</p>
        </div>
        {stock === 0 ? (
          <div className="py-4">
            <h4 className="font-extrabold text-red-400">Sold Out</h4>
          </div>
        ) : (
          <CustomButton
            position="py-4 mt-4"
            type="button"
            onClick={async () => {
              const [error] = await updateCart({
                products: [getCartItemFromProduct(product, quantity)],
                cart,
                setCart,
                action: ActionType.ADD,
                setQuantity,
                loggedIn: user !== null,
              });

              if (error) {
                handleToast(false, error);
                return;
              }
              handleToast(true, "Product added to cart!");
            }}
            isDisabled={() =>
              quantity +
                (cart.products.find(
                  (cartItem) => cartItem.productId === product.productId,
                )?.quantity || 0) >
              (stock || 0)
            }
          >
            add to cart
          </CustomButton>
        )}
      </>
    );
  }
};

export default ProductComponents;
