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
        <section className="flex flex-col flex-grow justify-center px-24">
            <div className='flex h-[85vh] items-center justify-center'>
                <div className='flex-1'>
                  <p className='text-6xl'>{collection?.name}</p>
                  <Link href='/shop/collections'><FontAwesomeIcon icon={faArrowTurnUp} size='2xl' className='icon-scale mt-4 -rotate-90 ml-2'/></Link>
                </div>
                <div className='flex-1'>
                  <p className='text-lg'>{collection?.description}</p>
                </div>
            </div>
            <div className='flex h-[75vh] items-center justify-center gap-2'>
                {
                  collection?.products.map((item, index) => (
                    <div key={index} className='flex h-full'>
                        <Image src={item.images[0]} width={100} height={100} alt="..." className='h-full w-96 aspect-square object-cover image-scale' />
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
