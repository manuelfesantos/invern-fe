'use client'
import { IProduct } from '@/types/store/product';
import React, { useState } from 'react';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react'
import {Navigation, Thumbs} from 'swiper/modules'

function ProductImage(
  { product, thumbsSwiper }:
  { product: IProduct, thumbsSwiper: any }
) {

  return (
    <div className="w-full">
      <Swiper
        modules={[ Navigation, Thumbs ]}
        thumbs={{ swiper: thumbsSwiper }}
        navigation
        className='w-full'>
          {
            product?.images.map((item,index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center w-full">
                  <Image
                    src={item}
                    alt=''
                    width={100}
                    height={100}
                    className='object-cover w-full' />
              </SwiperSlide>
            ))
          }
      </Swiper>
    </div>
  );
}

function CarouselThumbs(
  { product, setThumbsSwiper }:
  { product: IProduct, setThumbsSwiper: any }
) {
  return (
    <div className="h-full">
      <Swiper
            direction="vertical"
            spaceBetween={6}
            slidesPerView={8}
            className="h-full w-24">
          {
            product?.images.map((item,index) => (
              <SwiperSlide
                key={index}
                className="h-24 w-full flex items-center justify-center cursor-pointer overflow-hidden">
                  <Image
                    src={item}
                    alt=""
                    width={100}
                    height={100} />
              </SwiperSlide>
            ))
          }
      </Swiper>
    </div>
  );
}

const ProductCarousel = ({product}:{product:IProduct}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className='w-full h-full flex'>
      <div>
        <CarouselThumbs product={product} setThumbsSwiper={setThumbsSwiper} />
      </div>
      <div className='w-[75%] h-full ml-2'>
        <ProductImage product={product} thumbsSwiper={thumbsSwiper} />
      </div>
    </div>
  )
}

export default ProductCarousel