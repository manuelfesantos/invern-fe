import Layout from '@/components/Layout';
import React from 'react'
import { productsMock } from '@/mocks/products';
import ProductCard from '@/components/ProductCard';
import ProductsFilter from '@/components/ProductsFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSort } from '@fortawesome/free-solid-svg-icons';

const Everything = () => {
    return (
        <Layout>
          <section className='flex flex-col'>
                <div className='h-36 mb-4 lg:mb-6 lg:ml-24 flex flex-col items-center justify-center'>
                    <h2>Products</h2>
                </div>
                <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-12 place-items-center px-12 mb-4 lg:px-24'>
                  {
                    productsMock.map((item,index) => (
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

export default Everything