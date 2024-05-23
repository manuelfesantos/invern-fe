import React from 'react'
import Layout from '@/components/Layout';
import ProductCarousel from '@/components/ProductCarousel';
import ProductDetails from '@/components/ProductDetails';
import { getProductById, getProducts } from '@/utils/getFromDb';

export default async function ProductPage({params}: {params:{id:string}}) {

  const product = await getProductById(params.id)

  return (
    <Layout>
      <section className='h-full w-full flex items-center justify-center'>
          {
            product === undefined
              ? (
                <p>{`This product is not available at the moment.`}</p>
              )
              : (
                <>
                  <div className='h-full w-[50%] pl-12 py-2'>
                    <ProductCarousel product={product} />
                  </div>
                  <div className='h-full w-[50%] pr-12 py-2'>
                    <ProductDetails product={product} />
                  </div>
                </>
              )
            }
      </section>
    </Layout>
  )
}

export async function generateStaticParams() {
    const posts = await getProducts()

    return posts.map((post: any) => ({
      id: post.productId,
    }))
}

