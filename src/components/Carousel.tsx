'use client'
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { ICollectionDetails } from '@/types/store/collection';

const Carousel = ({collection}: {collection:ICollectionDetails}) => {

  return (
    <div className="flex w-screen absolute -z-10 opacity-35">
        <Swiper
            slidesPerView={1}
            effect={'fade'}
            modules={[Autoplay, EffectFade]}
            autoplay={{ delay: 5000 }}
            speed={5000}
            className="mySwiper">
        {
            collection.products.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Image src={item.productImage.imageUrl} width={100} height={100} alt={item.productImage.imageAlt} className="w-screen h-screen object-cover mix-blend-overlay grayscale" />
                    </SwiperSlide>
            ))
        }
        </Swiper>
    </div>
  )
}

export default Carousel