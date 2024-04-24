'use client'
import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { collectionsMock } from '@/mocks/collections';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const Carousel = () => {
    const [image,setImage] = useState();

  return (
    <div className="flex w-screen absolute z-[-1] opacity-35">
        <Swiper
            slidesPerView={1}
            effect={'fade'}
            modules={[Autoplay, EffectFade]}
            autoplay={{ delay: 5000 }}
            speed={5000}
            className="mySwiper">
        {
            collectionsMock[0].products.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Image src={item.images[0]} width={100} height={100} alt="..." className="w-screen h-screen object-cover" />
                    </SwiperSlide>
            ))
        }
        </Swiper>
    </div>
  )
}

export default Carousel