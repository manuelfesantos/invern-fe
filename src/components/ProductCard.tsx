import React from 'react'
import ProductComponents from './ProductComponents'
import { IProduct } from '@/types/store/product'

const ProductCard = ({product}:{product:IProduct}) => {
  return (
    <ProductComponents product={product} component='productCard'>
      <></>
    </ProductComponents>
  )
}

export default ProductCard