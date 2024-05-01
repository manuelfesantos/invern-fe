import React from 'react'
import { collectionsMock } from '@/mocks/collections'
import Layout from '@/components/Layout'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

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
          <div className='h-full w-full flex flex-col items-center justify-center gap-6 mt-12 lg:hidden'>
              {
                collection?.products.map((item, index) => (
                  <div key={index} className='w-screen flex flex-col items-center'>
                    <Image src={item.images[0]} width={100} height={100} alt="..." className='h-48 w-full px-12 object-cover image-scale' />
                    <div className='w-full flex justify-between px-12'>
                      <h3>{item.name}</h3>
                      <p>{item.price}</p>
                    </div>
                  </div>

                ))
              }
          </div>
          <div className='hidden min-h-[80vh] w-full lg:grid grid-rows-2 grid-cols-3 gap-4 place-items-center px-48'>
            {
              collection?.products.map((item, index) => (
                <div key={index} className='h-full'>
                    <Image src={item.images[0]} width={100} height={100} alt="..." className='h-full w-full object-cover image-scale' />
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

                    {
                      index % 2 === 0
                        ? (
                          <div className='flex items-center'>
                            <div className='mr-auto'>
                              <Image src={item.images[0]} width={100} height={100} alt="..." className='h-40 w-56 lg:w-96 object-cover image-scale' />
                            </div>
                            <div className='flex-1 px-6'>
                              <h4>{item.name}</h4>
                              <p className='p2'>{item.description}</p>
                            </div>
                          </div>
                        )
                        : (
                          <div className='flex items-center'>
                            <div className='flex-1 px-10'>
                              <h4>{item.name}</h4>
                              <p className='p2'>{item.description}</p>
                            </div>
                            <div className='ml-auto'>
                                <Image src={item.images[0]} width={100} height={100} alt="..." className='h-40 w-56 lg:w-96 object-cover image-scale' />
                            </div>
                          </div>
                        )
                    }

*/