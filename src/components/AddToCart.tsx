import React from 'react'
import { IProduct } from '@/types/store/product'
import { CartItem } from '@/types/store/cart'
import { Cart } from '@/types/store/cart'

export const addToCart = (
    {product,cart,setCart,quantity,setQuantity}:
    {product:IProduct,cart:Cart,setCart:any,quantity:number,setQuantity:any}
) => {
  
    const cartItem: CartItem = {
      id: product.id,
      quantity,
      price: product.price,
      product: product
    }
    if(cart.items.find(cartItem => cartItem.id === product.id)) {
      setCart((prevCart:Cart) => (
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
      setCart((prevCart:Cart) => ({
        ...prevCart,
        items: [...prevCart.items,cartItem]
      }
      ))
    }
    setQuantity(1)
  }