import React from 'react'
import { productsMock } from '@/mocks/products'
import Layout from '@/components/Layout';

export default function ProductsDetails({params}: {params:{id:string}}) {
    const product = productsMock.find((p) => p.id === params.id);

  return (
    <Layout>
      <div>{product?.name}</div>
    </Layout>
  )
}

export function generateStaticParams() {
    const posts = productsMock
    return posts.map((post: any) => ({
      id: post.id,
    }))
}