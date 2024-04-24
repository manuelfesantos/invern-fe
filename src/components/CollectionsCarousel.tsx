'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { collectionsMock } from '@/mocks/collections';
import Image from 'next/image';
import { EffectCoverflow } from 'swiper/modules';


const CollectionsCarousel = () => {
  return (
    <div>
        <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            loop={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 5,
              slideShadows: false,
            }}
            modules={[EffectCoverflow]}
            className="mySwiper">
        {
            collectionsMock.map((item, index) => (
                    <SwiperSlide>
                        {item.name}

                    </SwiperSlide>
            ))
        }
        </Swiper>
    </div>
  )
}

export default CollectionsCarousel