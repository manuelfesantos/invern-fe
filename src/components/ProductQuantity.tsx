'use client'
import React, { useState } from 'react'
import { IProduct } from '@/types/store/product'
import { Cart } from '@/types/store/cart'
import Button from './Button'

const ProductQuantity = (
  {product,cart,handleQuantity}:
  {product:IProduct,cart:Cart,handleQuantity:(quantity:number) => void}
) => {

    const [quantity,setQuantity] = useState(1)

    const add = () => {
      setQuantity((prevQuantity) => prevQuantity + 1)
      handleQuantity(quantity)
    }

    const reduce = () => {
      setQuantity((prevQuantity) => prevQuantity - 1)
      handleQuantity(quantity)
    }

  return (
    <div className='flex gap-2'>
        <Button position='h-6 w-6'
          onClick={reduce}
          isDisabled={() => quantity <= 1}>
            -
        </Button>
        <p>{quantity}</p>
        <Button position='h-6 w-6'
          onClick={add}
          isDisabled={() => quantity + (cart.items.find(cartItem => cartItem.id === product.id)?.quantity || 0) >= product.stock}>
            +
        </Button>
    </div>
  )
}

export default ProductQuantity