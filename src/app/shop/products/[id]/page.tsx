import React from 'react'
import { productsMock } from '@/mocks/products'
import Layout from '@/components/Layout';
import ProductCarousel from '@/components/ProductCarousel';
import ProductsDetails from '@/components/ProductsDetails';

export default function ProductsPage({params}: {params:{id:string}}) {
    const product = productsMock.find((p) => p.id === params.id);

  return (
    <Layout>
      <div className='flex flex-grow h-[80%] w-full mt-6'>
          {
            product !== undefined && (
              <>
                <div className='h-full w-[50%] pl-12'>
                  <ProductCarousel product={product} />
                </div>
                <div className='h-full w-[50%] pr-12'>
                  <ProductsDetails product={product} />
                </div>
              </>
            )
          }
      </div>
    </Layout>
  )
}

export function generateStaticParams() {
    const posts = productsMock
    return posts.map((post: any) => ({
      id: post.id,
    }))
}