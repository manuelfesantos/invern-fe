import React from 'react'
import { collectionsMock } from '@/mocks/collections'
import Layout from '@/components/Layout'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Swiper from 'swiper';
import { SwiperSlide } from 'swiper/react';

export default function CollectionsDetails({params}: {params:{name:string}}) {
  const collection = collectionsMock.find((c) => c.name === params.name);

  return (
    <Layout>
        <section className="flex flex-col flex-grow justify-center px-24">
            <div className='flex h-[85vh] items-center justify-center'>
                <div className='flex-1'>
                  <p className=' text-4xl'>{collection?.name}</p>
                  <Link href='/shop/collections'><FontAwesomeIcon icon={faArrowLeftLong} size='xl' className='icon-scale mt-4'/></Link>
                </div>
                <div className='flex-1'>
                  <p>{collection?.description}</p>
                </div>
            </div>
            <div className='flex flex-col items-center gap-8'>
                {
                  collection?.products.map((item, index) => (
                    <div key={index} className='flex gap-24'>
                      <div className='flex-1'>
                        <Image src={item.images[0]} width={100} height={100} alt="..." className='h-96 w-96 aspect-square object-cover image-scale' />
                      </div>
                      <div className='flex-1 flex flex-col gap-2 justify-center'>
                        <p className='text-2xl'>{item.name}</p>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  ))
                }
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
