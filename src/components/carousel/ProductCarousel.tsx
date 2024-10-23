'use client'
import { IProductDetails } from '@/types/store/product';
import React, { useState } from 'react';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react'
import {FreeMode, Navigation, Thumbs} from 'swiper/modules'

function ProductImage(
  { product, thumbsSwiper }:
  { product: IProductDetails, thumbsSwiper: any }
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
                    src={item.url}
                    alt={item.alt}
                    width={100}
                    height={100}
                    className='object-cover w-[95%]' />
              </SwiperSlide>
            ))
          }
      </Swiper>
    </div>
  );
}

function CarouselThumbs(
  { product, setThumbsSwiper }:
  { product: IProductDetails, setThumbsSwiper: any }
) {
  return (
    <>
      <div className="hidden lg:block h-full">
        <Swiper
              onSwiper={setThumbsSwiper}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              direction="vertical"
              spaceBetween={6}
              slidesPerView={8}
              navigation
              className="h-full w-24">
            {
              product?.images.map((item,index) => (
                <SwiperSlide
                  key={index}
                  className="h-24 w-full flex items-center justify-center cursor-pointer overflow-hidden">
                    <Image
                      src={item.url}
                      alt={item.alt}
                      width={100}
                      height={100} />
                </SwiperSlide>
              ))
            }
        </Swiper>
      </div>
      <div className="block lg:hidden h-full">
        <Swiper
              onSwiper={setThumbsSwiper}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              direction="horizontal"
              spaceBetween={6}
              slidesPerView={8}
              navigation
              className="h-full w-24">
            {
              product?.images.map((item,index) => (
                <SwiperSlide
                  key={index}
                  className="h-24 w-full flex items-center justify-center cursor-pointer overflow-hidden">
                    <Image
                      src={item.url}
                      alt={item.alt}
                      width={100}
                      height={100} />
                </SwiperSlide>
              ))
            }
        </Swiper>
      </div>
    </>

  );
}

const ProductCarousel = ({product}:{product:IProductDetails}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <div className='hidden w-full h-full lg:flex'>
        <div>
          <CarouselThumbs product={product} setThumbsSwiper={setThumbsSwiper} />
        </div>
        <div className='w-full h-full ml-2'>
          <ProductImage product={product} thumbsSwiper={thumbsSwiper} />
        </div>
      </div>
      <div className='flex flex-col w-full h-full mt-12 lg:mt-48 lg:hidden'>
        <div className=''>
          <ProductImage product={product} thumbsSwiper={thumbsSwiper} />
        </div>
        <div>
          <CarouselThumbs product={product} setThumbsSwiper={setThumbsSwiper} />
        </div>
      </div>
    </>
  )
}

export default ProductCarousel