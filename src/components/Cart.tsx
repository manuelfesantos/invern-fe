'use client'
import React from 'react'
import { Context } from 'react';
import { CustomButton, CustomLink } from './CustomComponents';
import { useState, useContext } from 'react';
import { CartContext } from '@/context/cart';
import { cartContext } from '@/context/cart';
import Image from 'next/image';
import Loading from './Loading';

const Cart = () => {

    const {cart,setCart} = useContext<CartContext>(cartContext as Context<CartContext>);
    const [loading, setLoading] = useState(false)

    const changeQuantity = (adding: boolean, productId: string) => {
        if(adding) {
            setCart(prevCart => (
                {
                  ...prevCart,
                  items:prevCart.items.map(cartItem =>
                    cartItem.id === productId
                      ? (
                        {...cartItem,quantity:cartItem.quantity+1}
                      )
                      : (
                        cartItem
                      )
                  )
                }
            ))
        }
        else {
            const cartItem = getCartItemById(productId)
            if(cartItem?.quantity === 1) {
                removeProductFromCart(cartItem.id)
            }
            else {
                setCart(prevCart => (
                    {
                        ...prevCart,
                        items:prevCart.items.map(item => (
                            item.id === productId
                                ? (
                                    {
                                        ...item,
                                        quantity:item.quantity-1
                                    }
                                )
                                : (
                                    item
                                )
                        ))
                    }
                ))
            }
        }
    }

    const removeProductFromCart = (productId: string) => {
        setCart(prevCart => (
            {
                ...prevCart,
                items:prevCart.items.filter(item => item.id !== productId)
            }
        )
        )
    }

    const getCartItemById = (id: string) => {
        return cart.items.find(item => item.id === id)
    }

    const checkout = async () => {
        setLoading(true)
        const response = await (await fetch('https://api-local.invernspirit.com/checkout', {
            body:
                JSON.stringify({
                    products: cart.items.map(item => ({
                        productId:item.id,
                        quantity:item.quantity
                    }))
                }),
            method: 'POST'
            }
        )).json()
        setLoading(false)
        return response.data.url
    }

    const redirectCheckout = () => {
        checkout().then(url => { window.location.replace(url) })
    }

    const subTotal =
        cart.items.reduce((acc,item) => (
            acc+(item.quantity*item.product.price)
        ),0)

    const shipping = 0

    const total = subTotal + shipping

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center flex-grow">
        {
            loading && (<Loading />)
        }
        <div className="h-[80%] flex-grow lg:mx-24 flex flex-col items-center p-6 lg:bg-[#4C4B48] bg-opacity-95 lg:card-shadow">
            <div className=''>
                <ul className="flex mb-6">
                    <li>
                        <h3 className="p-4 border-b-2">
                                Shopping Cart
                        </h3>
                    </li>
                </ul>
            </div>
            <div className='flex flex-col flex-grow gap-2 items-center justify-center'>
                {
                    cart.items.length === 0
                        ? (
                            <p>{`There's no items in the shopping cart.`}</p>
                        )
                        : (
                            cart.items.map((item,index) => (
                                <div key={index} className='flex gap-2'>
                                    <div>
                                        <Image src={item.product.productImage.imageUrl} height={100} width={100} alt={item.product.productImage.imageAlt} className='h-24 w-24 object-cover aspect-square' />
                                    </div>
                                    <div className="px-4 pb-4 pt-2">
                                        <h5>{item.product.productName}</h5>
                                        <div className="flex items-center justify-between">
                                            <p>Price: {item.product.price}€</p>
                                        </div>
                                        <div className='flex gap-2'>
                                            <p>Quantity:</p>
                                            <CustomButton position='h-6 w-6' type='button' onClick={() => changeQuantity(false,item.id)}>-</CustomButton>
                                            <p>{item.quantity}</p>
                                            <CustomButton position='h-6 w-6' type='button' onClick={() => changeQuantity(true,item.id)} isDisabled={() => item.quantity >= item.product.stock}>+</CustomButton>
                                        </div>
                                    </div>
                                    <div className='flex items-center'>
                                        <CustomLink position="block py-4 w-full text-right" onClick={() => removeProductFromCart(item.id)} href=''>Remove</CustomLink>
                                    </div>
                                </div>
                            ))
                        )
                }
            </div>
        </div>
        <div className="h-[80%] w-96 mr-12 flex flex-col items-center justify-center py-12 bg-[#4C4B48] shadow-lg drop-shadow-lg shadow-[#201F1D]">
            <div className='w-[80%] flex flex-col gap-6'>
                <h3>Summary:</h3>
                <hr />
                <div className='flex w-full flex-grow justify-between'>
                    <div className='flex flex-col gap-2'>
                        <p>Subtotal: </p>
                        <p>Shipping: </p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p>{subTotal}</p>
                        <p>{shipping}</p>
                    </div>
                </div>
                <hr />
                <div className='flex w-full flex-grow justify-between'>
                    <div className='flex flex-col gap-2'>
                        <h3>Total: </h3>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h3>{total}</h3>
                    </div>
                </div>
                <hr />
                <div>
                    <CustomButton position='w-full py-2' type='button' onClick={redirectCheckout}>checkout</CustomButton>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart