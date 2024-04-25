import React from 'react'
import { collectionsMock } from '@/mocks/collections'
import Layout from '@/components/Layout'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import CollectionsCarousel from '@/components/CollectionsCarousel';

export default function CollectionsDetails({params}: {params:{name:string}}) {
  const collection = collectionsMock.find((c) => c.name === params.name);

  return (
    <Layout>
        <section className="flex flex-col flex-grow justify-center px-24">
            <div className='flex my-4'>
                <div className='flex-1'>
                  <p className=' text-6xl'>{collection?.name}</p>
                  <Link href='/shop/collections'><FontAwesomeIcon icon={faArrowLeftLong} size='2xl' className='icon-scale'/></Link>
                </div>
                <div className='flex-1'>
                  <p>{collection?.description}</p>
                </div>
            </div>
            <div className='flex flex-grow items-center justify-center gap-2'>
              <CollectionsCarousel collection={collection} />
            </div>
        </section>
    </Layout>
  )
}

export function generateStaticParams() {
    const posts = collectionsMock

    return posts.map((post: any) => ({
      name: post.name,
    }))
}
