import React from 'react'
import { collectionsMock } from '@/mocks/collections'
import Layout from '@/components/Layout'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

export default function CollectionsDetails({params}: {params:{name:string}}) {
  const collection = collectionsMock.find((c) => c.name === params.name);

  return (
    <Layout>
        <section className='flex flex-col items-center justify-center'>
          <div className='lg:h-[85vh] w-full flex flex-col lg:flex-row items-center justify-center px-12 lg:px-24'>
            <div className='flex gap-5 mt-12 lg:hidden'>
              <Link href='/shop/collections'><FontAwesomeIcon icon={faArrowTurnUp} size='lg' className='icon-scale mt-6 -rotate-90 ml-2'/></Link>
              <h1>{collection?.name}</h1>
            </div>
            <div className='hidden flex-1 lg:block'>
              <h1 className='text-6xl'>{collection?.name}</h1>
              <Link href='/shop/collections'><FontAwesomeIcon icon={faArrowTurnUp} size='xl' className='icon-scale -rotate-90 ml-2'/></Link>
            </div>
            <div className='mt-12 lg:hidden'>
              <p className='p2'>{collection?.description}</p>
            </div>
            <div className='hidden flex-1 lg:block'>
              <p className='text-lg'>{collection?.description}</p>
            </div>
          </div>
          <div className='mt-12 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-12 place-items-center px-12 lg:hidden'>
              {
                collection?.products.map((item, index) => (
                  <div key={index}>
                    <ProductCard item={item} />
                  </div>
                ))
              }
          </div>
          <div className='hidden min-h-[80vh] w-full lg:grid grid-rows-2 grid-cols-3 gap-4 place-items-center px-48'>
            {
              collection?.products.map((item, index) => (
                <div key={index} className='h-full'>
                  <ProductCard item={item} />
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

/*
                  <Link href={`/shop/products/${item.id}`}><Image src={item.images[0]} width={100} height={100} alt="..." className='h-full w-full object-cover image-scale' /></Link>

*/