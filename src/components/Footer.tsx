"use client";
import React, { FormEvent, useState } from "react";
import { CustomButton } from "./CustomComponents";
import { useRef } from "react";
import { IProduct } from "@/types/store/product";
import ProductCardGrid from "./ProductCardGrid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const search = async (e: FormEvent) => {
    e.preventDefault();
    if (ref.current && ref.current.value) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/products?search=${ref.current.value}`,
        {
          headers: {
            [`${process.env.NEXT_PUBLIC_BACKEND_ID_KEY}`]: `${process.env.NEXT_PUBLIC_BACKEND_ID_VALUE}`,
            [`${process.env.NEXT_PUBLIC_BACKEND_SECRET_KEY}`]: `${process.env.NEXT_PUBLIC_BACKEND_SECRET_VALUE}`,
          },
        },
      );
      setShow(true);
      setProducts((await response.json()).data);
      ref.current.value = "";
    }
  };

  return (
    <>
      {show && (
        <div className="absolute top-0 left-0 py-12 z-30 h-[99.9dvh] w-screen flex flex-col items-center justify-start overflow-scroll bg-black bg-opacity-85">
          <div
            className="absolute top-0 left-0 h-[100dvh] w-screen"
            onClick={() => setShow(false)}
          />
          <ProductCardGrid products={products} />
          <div
            className="fixed top-3 right-3 lg:top-5 lg:right-5 z-30 cursor-pointer"
            onClick={() => {
              setShow(false);
              setProducts([]);
            }}
          >
            <FontAwesomeIcon icon={faXmark} size="2x" />
          </div>
        </div>
      )}
      <footer className="flex flex-col">
        <div className="text-right pr-2 pb-2">
          <p className="p2">© 2024 copyright Invern</p>
        </div>
        <form className="z-40" onSubmit={search}>
          <div className="relative h-10">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              ref={ref}
              id="search"
              className={`h-full w-screen pl-14 ${!show && "bg-opacity-70"} bg-[#4C4B48] focus:outline-none`}
              placeholder="search..."
              required
              autoComplete="off"
            />
            <CustomButton position="absolute h-full end-0 px-6" type="submit">
              search
            </CustomButton>
          </div>
        </form>
      </footer>
    </>
  );
};

export default Footer;
