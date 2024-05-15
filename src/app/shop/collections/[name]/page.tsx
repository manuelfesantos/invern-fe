import React from 'react'
import { collectionsMock } from '@/mocks/collections'
import Layout from '@/components/Layout'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

export default function CollectionsPage({params}: {params:{name:string}}) {
  const collection = collectionsMock.find((c) => c.name === params.name);

  return (
    <Layout>
        <section className='flex flex-col items-center justify-center'>
          <div className='lg:h-[85vh] w-full flex items-center'>
            <div className='flex flex-col lg:flex-row justify-center'>
              <div className='flex gap-4 mt-6 px-12 lg:hidden'>
                <Link href='/shop/collections'><FontAwesomeIcon icon={faArrowTurnUp} size='lg' className='icon-scale mt-3 -rotate-90'/></Link>
                <h2>{collection?.name}</h2>
              </div>
              <div className='lg:hidden px-12 mt-4'>
                <hr />
              </div>
              <div className='hidden flex-1 lg:pl-36 lg:-mr-12 lg:block'>
                <h2>{collection?.name}</h2>
                <Link href='/shop/collections'><FontAwesomeIcon icon={faArrowTurnUp} size='xl' className='icon-scale -rotate-90 ml-2'/></Link>
              </div>
              <div className='mt-6 px-12 lg:hidden'>
                <p>{collection?.description}</p>
              </div>
              <div className='hidden flex-1 lg:pr-24 lg:block'>
                <p className='text-lg'>{collection?.description}</p>
              </div>
            </div>
          </div>
          <div className='mt-12 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-12 place-items-center px-12 lg:hidden'>
              {
                collection?.products.map((item, index) => (
                  <div key={index}>
                    <ProductCard product={item} />
                  </div>
                ))
              }
          </div>
          <div className='hidden min-h-[80vh] w-full lg:grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-12 place-items-center px-12 lg:px-24'>
            {
              collection?.products.map((item, index) => (
                <div key={index} className='h-full'>
                  <ProductCard product={item} />
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