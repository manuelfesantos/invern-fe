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
          <section className='flex overflow-hidden'>
            <div className='hidden lg:block w-80 bg-[#4C4B48] ml-6'>
              <ProductsFilter />
            </div>
            <div className='flex-grow overflow-auto'>
              <div className='flex flex-col'>
                <div className='h-36 mb-4 lg:mb-6 lg:ml-24 flex flex-col items-center lg:items-start justify-center'>
                  <div>
                    <h2>Products</h2>
                  </div>
                  <div className='w-full lg:hidden flex justify-center gap-6'>
                    <p><FontAwesomeIcon icon={faFilter} /> filter by: </p>
                    <p><FontAwesomeIcon icon={faSort} /> sort by: </p>
                  </div>
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
              </div>
            </div>
          </section>
        </Layout>
      );
}

export default Everything