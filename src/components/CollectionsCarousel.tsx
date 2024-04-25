'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import Image from 'next/image';

const CollectionsCarousel = ({collection}) => {
  return (
    <>
      <Swiper
        loop={true}
        grabCursor={true}
        centeredSlides={true}
            slidesPerView={3}>
        {
          collection?.products.map((item, index) => (
            <SwiperSlide key={index}>
              <Image src={item.images[0]} width={100} height={100} alt="..." className='h-96 w-72 object-cover image-scale' />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  )
}

export default CollectionsCarousel

/*
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
*/