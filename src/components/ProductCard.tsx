'use client'
import React, { useState, useContext, Context } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from './Button'
import { IProduct } from '@/types/store/product'
import { CartContext, cartContext } from '@/context/cart'
import { addToCart } from './AddToCart'
import ProductQuantity from './ProductQuantity'

const ProductCard = ({product}:{product:IProduct}) => {

  const {cart, setCart} = useContext<CartContext>(cartContext as Context<CartContext>);
  const [quantity, setQuantity] = useState(1)

  const handleQuantity = (quantity: number) => {
    setQuantity(quantity)
  }

  return (
    <div className="w-full bg-[#4C4B48] card-shadow">
        <div>
          <Link href={`/shop/products/${product.id}`}>
            <Image src={product.images[0]} height={100} width={100} alt="..." className='h-72 w-72 object-cover aspect-square' />
          </Link>
        </div>
        <div className="px-4 pb-4 pt-2">
          <div className="flex items-center justify-between mb-2">
            <h5>{product.name}</h5>
            <ProductQuantity product={product} cart={cart} handleQuantity={handleQuantity} />
          </div>
          <div className="flex items-center justify-between">
            <h3 className='font-extrabold justify-self-center'>{product.price}€</h3>
            {
              product.stock === 0
                ? (
                  <div className='px-4 py-2'><h4 className='font-extrabold text-red-400'>Sold Out</h4></div>
                )
                : (
                  <Button
                    position="px-4 py-2"
                    onClick={() => addToCart({product,cart,setCart,quantity,setQuantity})}
                    isDisabled={() => quantity + (cart.items.find(cartItem => cartItem.id === product.id)?.quantity || 0) > product.stock}>
                      add to cart
                  </Button>
                )
            }
          </div>
        </div>
    </div>
  )
}

export default ProductCard

/*
  const addToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      quantity,
      price: product.price,
      product: product
    }
    if(cart.items.find(cartItem => cartItem.id === product.id)) {
      setCart(prevCart => (
        {
          ...prevCart,
          items:prevCart.items.map(cartItem =>
            cartItem.id === product.id
              ? (
                {...cartItem,quantity:cartItem.quantity+quantity}
              )
              : (
                cartItem
              )
          )
        }
      ))
    }
    else {
      setCart(prevCart => ({
        ...prevCart,
        items: [...prevCart.items,cartItem]
      }
      ))
    }
    setQuantity(1)
  }
*/