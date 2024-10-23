"use client";
import { IProductDetails } from "@/types/store/product";
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = (props: any) => {
  const { className, onClick, style } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...style,
        position: "absolute",
        top: "50%",
        right: "0",
        zIndex: 20,
        width: "2.5rem",
        height: "2.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
};

const PrevArrow = (props: any) => {
  const { className, onClick, style } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...style,
        position: "absolute",
        top: "50%",
        left: "0",
        zIndex: 20,
        width: "2.5rem",
        height: "2.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
};

const ProductCarousel2 = ({ product }: { product: IProductDetails }) => {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const [nav3, setNav3] = useState<Slider | null>(null);
  const [nav4, setNav4] = useState<Slider | null>(null);
  let sliderRef1 = useRef<Slider | null>(null);
  let sliderRef2 = useRef<Slider | null>(null);
  let sliderRef3 = useRef<Slider | null>(null);
  let sliderRef4 = useRef<Slider | null>(null);

  useEffect(() => {
    // @ts-ignore
    setNav1(sliderRef1);
    // @ts-ignore
    setNav2(sliderRef2);
    // @ts-ignore
    setNav3(sliderRef3);
    // @ts-ignore
    setNav4(sliderRef4);
  }, []);

  return (
    <>
      <div className="hidden lg:grid grid-cols-5 gap-2">
        <div className="col-span-1">
          {
            //@ts-ignore
            <Slider
              asNavFor={nav1}
              //@ts-ignore
              ref={(slider) => (sliderRef2 = slider)}
              slidesToShow={product.images.length}
              swipeToSlide={true}
              focusOnSelect={true}
              arrows={false}
              vertical={true}
            >
              {product?.images.map((item, index) => (
                <div key={index}>
                  <div className="img-body">
                    <img
                      src={item.url}
                      alt={item.alt}
                      className={"cursor-pointer"}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          }
        </div>
        <div className="col-span-4">
          {
            //@ts-ignore
            <Slider
              asNavFor={nav2}
              //@ts-ignore
              ref={(slider) => (sliderRef1 = slider)}
              arrows={true}
              nextArrow={<NextArrow />}
              prevArrow={<PrevArrow />}
            >
              {product?.images.map((item, index) => (
                <div key={index}>
                  <div className="img-body">
                    <img src={item.url} alt={item.alt} />
                  </div>
                </div>
              ))}
            </Slider>
          }
        </div>
      </div>
      <div className="lg:hidden">
        <div className="">
          {
            //@ts-ignore
            <Slider
              asNavFor={nav4}
              //@ts-ignore
              ref={(slider) => (sliderRef3 = slider)}
              arrows={false}
            >
              {product?.images.map((item, index) => (
                <div key={index}>
                  <div className="img-body">
                    <img src={item.url} alt={item.alt} />
                  </div>
                </div>
              ))}
            </Slider>
          }
        </div>
        <div className="">
          {
            //@ts-ignore
            <Slider
              asNavFor={nav3}
              //@ts-ignore
              ref={(slider) => (sliderRef4 = slider)}
              slidesToShow={product.images.length}
              swipeToSlide={true}
              focusOnSelect={true}
              arrows={false}
            >
              {product?.images.map((item, index) => (
                <div key={index}>
                  <div className="img-body">
                    <img src={item.url} alt={item.alt} />
                  </div>
                </div>
              ))}
            </Slider>
          }
        </div>
      </div>
    </>
  );
};

export default ProductCarousel2;
