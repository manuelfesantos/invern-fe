import React from 'react'
import { productsMock } from '@/mocks/products'
import Layout from '@/components/Layout';
import Image from 'next/image';
import ProductCarousel from '@/components/ProductCarousel';

export default function ProductsDetails({params}: {params:{id:string}}) {
    const product = productsMock.find((p) => p.id === params.id);

  return (
    <Layout>
      <div className='flex'>
          {
            product !== undefined && (
              <>
                <div>
                  <ProductCarousel product={product} />
                </div>
                <div>
                  <h2>{product.name}</h2>
                  <h2>{product.price}€</h2>
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