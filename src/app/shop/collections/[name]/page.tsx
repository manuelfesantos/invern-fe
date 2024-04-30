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
          <div className='h-full w-full flex flex-col gap-12 mt-12 lg:hidden'>
              {
                collection?.products.map((item, index) => (
                  <div key={index}>
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
                  </div>
                ))
              }
          </div>
          <div className='hidden h-[80vh] w-full lg:flex items-center justify-center gap-2 mt-0'>
            {
              collection?.products.map((item, index) => (
                <div key={index} className='h-full'>
                    <Image src={item.images[0]} width={100} height={100} alt="..." className='h-full w-96 object-cover image-scale' />
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
