import React from 'react'
import ProductCard from './ProductCard'
import { IProduct } from '@/types/store/product'

const ProductCardGrid = ({products}:{products:IProduct[]}) => {

    return (
        <div className='w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-12 place-items-center my-4 px-12 lg:px-36'>
            {
                products.map((item,index) => (
                    <div key={index}>
                        <ProductCard product={item} />
                    </div>
                ))
            }
        </div>
    )
}

export default ProductCardGrid