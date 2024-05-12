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
    <div className="mb-1">
      <Swiper
        modules={[ Navigation, Thumbs ]}
        thumbs={{ swiper: thumbsSwiper }}
        navigation>
          {
            product?.images.map((item,index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center">
                  <Image
                    src={item}
                    alt=''
                    width={450}
                    height={450} />
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
    <div className="">
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={6}
        slidesPerView={6}
        watchSlidesProgress={true}
        freeMode={true}
        observer={true}
        observeParents={true}>
          {
            product?.images.map((item,index) => (
              <SwiperSlide
                key={index}
                className="flex items-center justify-center cursor-pointer overflow-hidden">
                  <Image
                    src={item}
                    alt=""
                    width={80}
                    height={80} />
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
    <div className='w-96 h-96'>
      <ProductImage product={product} thumbsSwiper={thumbsSwiper} />
      <CarouselThumbs product={product} setThumbsSwiper={setThumbsSwiper} />
    </div>
  )
}

export default ProductCarousel