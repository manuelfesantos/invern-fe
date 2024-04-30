import React from 'react'
import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { collectionsMock } from '@/mocks/collections';

const Collections = () => {
    return (
      <Layout>
        <section className='h-full w-full relative flex flex-col lg:flex-row items-center justify-center gap-2'>
          <div className='absolute top-0 h-12 lg:h-24 w-full flex flex-col items-center justify-center'>
              <div>
                <h2 className='lg:text-6xl'>collections</h2>
              </div>
          </div>
          {
            collectionsMock.map((item, index) => (
              <Link key={index} href={`/shop/collections/${item.name}`} className='h-24 lg:h-full w-full lg:w-48 relative flex items-center justify-center'>
                  <Image
                    src={item.products[0].images[0]}
                    height={100}
                    width={100}
                    alt="collections"
                    className='h-full w-full object-cover mix-blend-overlay' />
                  <h2 className='absolute lg:text-4xl'>{item.name}</h2>
              </Link>
            ))
          }
        </section>
      </Layout>
      );
}

export default Collections