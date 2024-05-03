import React from 'react'
import { collectionsMock } from '@/mocks/collections';
import Button from './Button';

const ProductsFilter = () => {
  return (
    <form className='h-full w-full'>
        <div className='h-full w-full flex flex-col'>
            <div className='flex flex-col my-4 mx-8'>
                <h4>Collections:</h4>
                <div className='flex flex-col'>
                    {
                        collectionsMock.map((item,index) => (
                        <div key={index} className='flex gap-1'>
                            <input type="checkbox" id={item.name} className='outline-none' />
                            <label htmlFor={item.name}>{item.name}</label>
                        </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex flex-col my-4 mx-8'>
                <h4>Price:</h4>
                <div className='flex flex-col'>
                    <div className='flex gap-1'>
                        <input type="radio" id="100" />
                        <label htmlFor="100">0 - 100</label>
                    </div>
                    <div className='flex gap-1'>
                        <input type="radio" id="200" />
                        <label htmlFor="200">100 - 200</label>
                    </div>
                    <div className='flex gap-1'>
                        <input type="radio" id="300" />
                        <label htmlFor="300">200 - 300</label>
                    </div>
                </div>
            </div>
            <div className='flex flex-col my-4 mx-8'>
                <h4>Sort By:</h4>
                <div></div>

            </div>
            <div className='mt-auto w-full flex flex-col items-center justify-center'>
                <Button position="w-[95%] p-2 mb-2">filter</Button>
            </div>
        </div>
    </form>
  )
}

export default ProductsFilter