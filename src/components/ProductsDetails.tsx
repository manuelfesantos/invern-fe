'use client'
import React from 'react'
import { IProduct, IProductDetails } from '@/types/store/product'
import ProductComponents from './ProductComponents';
import { productDetailsToProduct } from '@/utils/productDetailsToProduct';

const ProductsDetails = ({product}:{product:IProductDetails}) => {

  return (
    <div className='flex flex-col gap-4'>
        <h1>{product.productName}</h1>
        <h2>{product.price/100}€</h2>
        <hr />
        <p className='text-lg'></p>
        <select className='text-lg bg-[#4C4B48] text-white px-2' >
          <option>Select a size:</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>
        <p className='text-lg'>Available: {product.stock}</p>
        <ProductComponents product={productDetailsToProduct(product)} component={'productDetails'} />
    </div>
  )
}

export default ProductsDetails