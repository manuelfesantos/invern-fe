'use client'
import React, { useState, Context, useContext } from 'react'
import Button from './Button';
import { IProduct } from '@/types/store/product'
import { CartContext, cartContext } from '@/context/cart';
import { addToCart } from '@/components/AddToCart';
import ProductQuantity from './ProductQuantity';

const ProductsDetails = ({product}:{product:IProduct}) => {

    const {cart,setCart} = useContext<CartContext>(cartContext as Context<CartContext>);
    const [quantity, setQuantity] = useState(1)

    const handleQuantity = (quantity: number) => {
      setQuantity(quantity)
    }

  return (
    <>
        <h2>{product.name}</h2>
        <h3>{product.price}€</h3>
        <p>{product.description}</p>
        <p>Available: {product.stock}</p>
        <ProductQuantity product={product} cart={cart} handleQuantity={handleQuantity} />
        <Button position='' onClick={() => addToCart({product,cart,setCart,quantity,setQuantity})}>add to cart</Button>
    </>
  )
}

export default ProductsDetails