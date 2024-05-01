import React from 'react'
import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { collectionsMock } from '@/mocks/collections';

const Collections = () => {
    return (
      <Layout>
        <section className='h-full w-full flex flex-col lg:flex-row items-center lg:justify-center gap-2 lg:relative'>
          <div className='lg:absolute lg:top-0 h-12 lg:h-24 w-full mt-12 mb-12 lg:mt-0 lg:mb-12 flex flex-col items-center justify-center'>
              <div className='lg:z-20'>
                <h2 className='text-6xl'>collections</h2>
              </div>
          </div>
          {
            collectionsMock.map((item, index) => (
              <div className='bg-[#201F1D] h-24 lg:h-full w-full lg:w-48 image-scale'>
                <Link key={index} href={`/shop/collections/${item.name}`} className='h-full w-full relative flex items-center justify-center'>
                    <Image
                      src={item.products[0].images[0]}
                      height={100}
                      width={100}
                      alt="collections"
                      className='h-full w-full object-cover mix-blend-overlay opacity-90 hover:mix-blend-exclusion' />
                    <h2 className='absolute lg:text-4xl'>{item.name}</h2>
                </Link>
              </div>

            ))
          }
        </section>
      </Layout>
      );
}

export default Collections