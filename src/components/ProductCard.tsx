import React, {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IProduct } from '@/types/store/product'
import ProductComponents from './ProductComponents'

const ProductCard = ({product}:{product:IProduct}) => {

  return (
    <div className="w-full bg-[#4C4B48] card-shadow">
        <div>
          <Link href={`/shop/products/${product.productId}`}>
            <Image src={product.productImage.imageUrl} height={100} width={100} alt={product.productImage.imageAlt} className='h-72 w-72 object-cover aspect-square' />
          </Link>
          <ProductComponents product={product} component='productCard' />
        </div>

    </div>
  )
}

export default ProductCard

/*
    <div className="w-full bg-[#4C4B48] card-shadow">
        <div>
          <Link href={`/shop/products/${product.productId}`}>
            <Image src={product.productImage.imageUrl} height={100} width={100} alt={product.productImage.imageAlt} className='h-72 w-72 object-cover aspect-square' />
          </Link>
        </div>
        <div className="px-4 pb-4 pt-2">
          <div className="flex items-center justify-between mb-2">
            <h5>{product.productName}</h5>
            <ProductComponents product={product} component={'quantity'} />
          </div>
          <div className="flex items-center justify-between">
            <h3 className='font-extrabold justify-self-center'>{product.price/100}€</h3>
            {
              product.stock === 0
                ? (
                  <div className='px-4 py-2'><h4 className='font-extrabold text-red-400'>Sold Out</h4></div>
                )
                : (
                  <ProductComponents product={product} component={'addtocart'} />
                )
            }
          </div>
        </div>
    </div>
*/