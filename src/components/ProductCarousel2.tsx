'use client'
import { IProductDetails } from '@/types/store/product'
import React, { useState, useEffect, useRef, SetStateAction } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCarousel2 = ({product}:{product:IProductDetails}) => {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    let sliderRef1 = useRef(null);
    let sliderRef2 = useRef(null);

    useEffect(() => {
      setNav1(sliderRef1);
      setNav2(sliderRef2);
    }, []);

  return (
    <>
        <div className="hidden lg:grid grid-cols-5 gap-2">
            <div className='col-span-1'>
                <Slider
                    asNavFor={nav1}
                    ref={slider => (sliderRef2 = slider)}
                    slidesToShow={product.images.length}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    arrows={false}
                    vertical={true}
                    verticalSwiping={true}>
                        {
                            product?.images.map((item,index) => (
                                <div key={index}>
                                    <div className='img-body'>
                                        <img
                                            src={item.url}
                                            alt={item.alt}
                                            />
                                    </div>
                                </div>
                            ))
                        }
                </Slider>
            </div>
            <div className='col-span-4'>
                <Slider
                    asNavFor={nav2}
                    ref={slider => (sliderRef1 = slider)}
                    vertical={true}
                    verticalSwiping={true}
                    arrows={false}>
                        {
                            product?.images.map((item,index) => (
                                <div key={index}>
                                    <div className='img-body'>
                                        <img
                                            src={item.url}
                                            alt={item.alt}
                                            />
                                    </div>
                                </div>
                            ))
                        }
                </Slider>
            </div>
        </div>
        <div className="lg:hidden">
            <div className=''>
                <Slider
                    asNavFor={nav2}
                    ref={slider => (sliderRef1 = slider)}
                    arrows={false}>
                        {
                            product?.images.map((item,index) => (
                                <div key={index}>
                                    <div className='img-body'>
                                        <img
                                            src={item.url}
                                            alt={item.alt}
                                            />
                                    </div>
                                </div>
                            ))
                        }
                </Slider>
            </div>
            <div className=''>
                <Slider
                    asNavFor={nav1}
                    ref={slider => (sliderRef2 = slider)}
                    slidesToShow={product.images.length}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    arrows={false}>
                        {
                            product?.images.map((item,index) => (
                                <div key={index}>
                                    <div className='img-body'>
                                        <img
                                            src={item.url}
                                            alt={item.alt}
                                            />
                                    </div>
                                </div>
                            ))
                        }
                </Slider>
            </div>
        </div>
    </>

  )
}

export default ProductCarousel2