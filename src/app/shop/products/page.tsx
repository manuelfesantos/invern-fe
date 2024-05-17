import React from 'react'
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/utils/getFromDb';

const Products = async () => {
  const products = await getProducts()

    return (
        <Layout>
          <section className='flex flex-col'>
              <div className='h-36 mb-4 lg:mb-6 flex flex-col items-center justify-center'>
                  <h2>Products</h2>
              </div>
              <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-12 place-items-center px-12 mb-4 lg:px-24'>
                  {
                  products.map((item,index) => (
                      <div key={index}>
                      <ProductCard product={item} />
                      </div>
                  ))
                  }
              </div>
          </section>
        </Layout>
      );
}
export default Products