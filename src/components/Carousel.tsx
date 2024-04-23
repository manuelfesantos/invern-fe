'use client'
import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { collectionsMock } from '@/mocks/collections';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const Carousel = () => {
    const [image,setImage] = useState();

  return (
    <div className="flex w-screen absolute z-[-1]">
        <Swiper
            slidesPerView={1}
            modules={[Autoplay]}
            autoplay={{ delay: 5000 }}
            speed={1000}
            className="mySwiper">
        {
            collectionsMock[0].products.map((item, index) => (
                    <SwiperSlide>
                        <Image key={index} src={item.images[0]} width={100} height={100} alt="..." className="w-screen h-screen object-cover opacity-35" />
                    </SwiperSlide>
            ))
        }
        </Swiper>
    </div>
  )
}

export default Carousel