'use client'
import React, { useState,useContext,Context } from 'react'
import { CartContext,cartContext } from '@/context/cart'
import { IProduct, IProductDetails } from '@/types/store/product'
import { addToCart } from '@/utils/addToCart'
import Button from './Button'

const ProductComponents = (
  {product,component}:
  {product:IProduct,component:string}
) => {
    const {cart,setCart} = useContext<CartContext>(cartContext as Context<CartContext>);
    const [quantity,setQuantity] = useState(1)

    const add = () => {
      setQuantity((prevQuantity) => prevQuantity + 1)
    }

    const reduce = () => {
      setQuantity((prevQuantity) => prevQuantity - 1)
    }

  if(component === 'productCard') {
    return (
    <>
        <div className="px-4 pb-4 pt-2">
          <div className="flex items-center justify-between mb-2">
            <h5>{product.productName}</h5>
            <div className='flex gap-2'>
                <Button position='h-6 w-6'
                  onClick={reduce}
                  isDisabled={() => quantity <= 1}>
                    -
                </Button>
                <p>{quantity}</p>
                <Button position='h-6 w-6'
                  onClick={add}
                  isDisabled={() => quantity + (cart.items.find(cartItem => cartItem.id === product.productId)?.quantity || 0) >= product.stock}>
                    +
                </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h3 className='font-extrabold justify-self-center'>{product.price/100}€</h3>
            {
              product.stock === 0
                ? (
                  <div className='px-4 py-2'><h4 className='font-extrabold text-red-400'>Sold Out</h4></div>
                )
                : (
                  <Button
                    position="px-4 py-2"
                    onClick={() => addToCart({product,cart,setCart,quantity,setQuantity})}
                    isDisabled={() => quantity + (cart.items.find(cartItem => cartItem.id === product.productId)?.quantity || 0) > product.stock}>
                      add to cart
                  </Button>
                )
            }
          </div>
        </div>
    </>
  )
  }
  else {
    return (
      <>
        <p className='text-lg'>Quantity:
          <div className='flex gap-2'>
              <Button position='h-6 w-6'
                onClick={reduce}
                isDisabled={() => quantity <= 1}>
                  -
              </Button>
              <p>{quantity}</p>
              <Button position='h-6 w-6'
                onClick={add}
                isDisabled={() => quantity + (cart.items.find(cartItem => cartItem.id === product.productId)?.quantity || 0) >= product.stock}>
                  +
              </Button>
          </div>
        </p>
        {
          product.stock === 0
            ? (
              <div className='px-4 py-2'><h4 className='font-extrabold text-red-400'>Sold Out</h4></div>
            )
            : (
              <Button
                position="px-4 py-2"
                onClick={() => addToCart({product,cart,setCart,quantity,setQuantity})}
                isDisabled={() => quantity + (cart.items.find(cartItem => cartItem.id === product.productId)?.quantity || 0) > product.stock}>
                  add to cart
              </Button>
            )
        }
      </>
    )
  }
}

export default ProductComponents

/*
      {
        component === 'quantity'
          ? (
            <div className='flex gap-2'>
                <Button position='h-6 w-6'
                  onClick={reduce}
                  isDisabled={() => quantity <= 1}>
                    -
                </Button>
                <p>{quantity}</p>
                <Button position='h-6 w-6'
                  onClick={add}
                  isDisabled={() => quantity + (cart.items.find(cartItem => cartItem.id === product.productId)?.quantity || 0) >= product.stock}>
                    +
                </Button>
            </div>
          )
          : (
            <Button
              position="px-4 py-2"
              onClick={() => addToCart({product,cart,setCart,quantity,setQuantity})}
              isDisabled={() => quantity + (cart.items.find(cartItem => cartItem.id === product.productId)?.quantity || 0) > product.stock}>
                add to cart
            </Button>
          )
      }
*/