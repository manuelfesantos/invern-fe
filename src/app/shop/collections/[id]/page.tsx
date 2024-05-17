import React from 'react'
import Layout from '@/components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import axios from 'axios';
import { getCollectionById } from '@/utils/getFromDb';

export default async function CollectionPage({params}: {params:{id:string}}) {

  const collection = await getCollectionById(params.id)

  return (
    <Layout>
        {
          collection !== undefined && (
            <section className='flex flex-col items-center justify-center'>
              <div className='lg:h-[85vh] w-full flex items-center'>
                <div className='flex flex-col lg:flex-row justify-center'>
                  <div className='flex gap-4 mt-6 px-12 lg:hidden'>
                    <Link href='/shop/collections'><FontAwesomeIcon icon={faArrowTurnUp} size='lg' className='icon-scale mt-3 -rotate-90'/></Link>
                    <h2>{collection?.collectionName}</h2>
                  </div>
                  <div className='lg:hidden px-12 mt-4'>
                    <hr />
                  </div>
                  <div className='hidden flex-1 lg:pl-36 lg:-mr-12 lg:block'>
                    <h2>{collection?.collectionName}</h2>
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
          )
        }
    </Layout>
  )
}

export async function generateStaticParams() {
  const response = await axios.get('https://api-local.invernspirit.com/collections');
  const posts = response.data.data;

  return posts.map((post: { collectionId: string }) => ({
    id: post.collectionId,
  }));
}