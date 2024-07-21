"use client";
import React, { useState, useContext, Context } from "react";
import Link from "next/link";
import Image from "next/image";
import { CartContext, cartContext } from "@/context/cart";
import { WishListContext, wishListContext } from "@/context/wishList";
import { IProduct } from "@/types/store/product";
import { addToCart } from "@/utils/addToCart";
import { CustomButton } from "./CustomComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { WishList } from "@/types/store/wishList";
import { ReactNode } from "react";
import useToast from "@/hooks/useToast";
import { Toast } from "./Toast";

const ProductComponents = ({
  children,
  product,
  component,
}: {
  children: ReactNode;
  product: IProduct;
  component: string;
}) => {
  const { cart, setCart } = useContext<CartContext>(
    cartContext as Context<CartContext>,
  );
  const { wishList, setWishList } = useContext<WishListContext>(
    wishListContext as Context<WishListContext>,
  );
  const [quantity, setQuantity] = useState(1);
  const { toast, handleToast } = useToast();

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
      handleToast(false, "Product removed from wishlist!", true);
    } else {
      setWishList((prevWishList: WishList) => ({
        products: [...prevWishList.products, product],
      }));
      handleToast(true, "Product added to wishlist!", true);
    }
  };

  if (component === "productCard") {
    return (
      <>
        <div className="w-full bg-[#4C4B48] card-shadow">
          <div className="relative">
            <div>
              <Link href={`/shop/products/${product.productId}`}>
                <Image
                  src={product.images[0].url}
                  height={100}
                  width={100}
                  alt={product.images[0].alt}
                  className="h-72 w-72 object-cover aspect-square"
                />
              </Link>
            </div>
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
            <div className="px-4 pb-4 pt-2">
              <div className="flex items-center justify-between mb-2">
                <h5>{product.productName}</h5>
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
                        (cart.items.find(
                          (cartItem) => cartItem.id === product.productId,
                        )?.quantity || 0) >=
                      product.stock
                    }
                  >
                    +
                  </CustomButton>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold justify-self-center">
                  {product.priceInCents}€
                </h3>
                {product.stock === 0 ? (
                  <div className="px-4 py-2">
                    <h4 className="font-extrabold text-red-400">Sold Out</h4>
                  </div>
                ) : (
                  <CustomButton
                    position="px-4 py-2"
                    type="button"
                    onClick={async () => {
                      await addToCart({
                        product,
                        cart,
                        setCart,
                        quantity,
                        setQuantity,
                      });
                      handleToast(true, "Product added to cart!", true);
                    }}
                    isDisabled={() =>
                      quantity +
                        (cart.items.find(
                          (cartItem) => cartItem.id === product.productId,
                        )?.quantity || 0) >
                      product.stock
                    }
                  >
                    add to cart
                  </CustomButton>
                )}
              </div>
            </div>
          </div>
        </div>
        {toast.isLoading && <Toast message={toast.message} type={toast.type} />}
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-col">
          <h1>{product.productName}</h1>
          <div className="flex justify-between">
            <h2 className="px-2">{product.priceInCents}€</h2>
            <div className="cursor-pointer icon-scale" onClick={toggleLike}>
              {wishList.products.find(
                (item) => item.productId === product.productId,
              ) ? (
                <FontAwesomeIcon icon={solidHeart} size="3x" />
              ) : (
                <FontAwesomeIcon icon={regularHeart} size="3x" />
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
              position="h-8 w-8"
              type="button"
              onClick={reduce}
              isDisabled={() => quantity <= 1}
            >
              -
            </CustomButton>
            <h4>{quantity}</h4>
            <CustomButton
              position="h-8 w-8"
              type="button"
              onClick={add}
              isDisabled={() =>
                quantity +
                  (cart.items.find(
                    (cartItem) => cartItem.id === product.productId,
                  )?.quantity || 0) >=
                product.stock
              }
            >
              +
            </CustomButton>
          </div>
          <p className="text-lg">Available: {product.stock}</p>
        </div>
        {product.stock === 0 ? (
          <div className="py-4">
            <h4 className="font-extrabold text-red-400">Sold Out</h4>
          </div>
        ) : (
          <CustomButton
            position="py-4"
            type="button"
            onClick={async () => {
              await addToCart({
                product,
                cart,
                setCart,
                quantity,
                setQuantity,
              });
              handleToast(true, "Product added to cart!", true);
            }}
            isDisabled={() =>
              quantity +
                (cart.items.find(
                  (cartItem) => cartItem.id === product.productId,
                )?.quantity || 0) >
              product.stock
            }
          >
            add to cart
          </CustomButton>
        )}
        {toast.isLoading && <Toast message={toast.message} type={toast.type} />}
      </>
    );
  }
};

export default ProductComponents;
