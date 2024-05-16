'use client'
import React from 'react'
import { useState, Context } from 'react';
import Button from './Button';
import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '@/context/cart';
import { cartContext } from '@/context/cart';
import Image from 'next/image';

const Cart = () => {

    const {cart,setCart} = useContext<CartContext>(cartContext as Context<CartContext>);
    const [activeTab,setActiveTab] = useState('cart')

    const handleRequest = () => {
        if(activeTab === 'cart') {
            setActiveTab('shipping')
        }
        else if(activeTab === 'shipping') {
            setActiveTab('payment')
        }
    }

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

    const subTotal =
        cart.items.reduce((acc,item) => (
            acc+(item.quantity*item.product.price)
        ),0)

    const shipping = 0

    const total = subTotal + shipping

  return (
    <div className="flex items-center justify-center flex-grow">
        <div className="h-[80%] flex-grow mx-24 flex flex-col items-center p-6 bg-[#4C4B48] card-shadow">
            <div className=''>
                <ul className="flex mb-6">
                    <li>
                        <h4 className={activeTab === 'cart' ? "p-4 border-b-2" : "p-4 text-[#201F1D]"}>
                                Shopping Cart
                        </h4>
                    </li>
                    <li>
                        <h4 className={activeTab === 'shipping' ? "p-4 border-b-2" : "p-4 text-[#201F1D]"}>
                                Shipping
                        </h4>
                    </li>
                    <li>
                        <h4 className={activeTab === 'payment' ? "p-4 border-b-2" : "p-4 text-[#201F1D]"}>
                                Payment
                        </h4>
                    </li>
                </ul>
            </div>
            <div className='flex flex-col flex-grow gap-2 items-center justify-center'>
                {
                    activeTab === 'cart'
                        ? (
                            <div className=''>
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
                                                            <Button position='h-6 w-6' onClick={() => changeQuantity(false,item.id)}>-</Button>
                                                            <p>{item.quantity}</p>
                                                            <Button position='h-6 w-6' onClick={() => changeQuantity(true,item.id)} isDisabled={() => item.quantity >= item.product.stock}>+</Button>
                                                        </div>
                                                    </div>
                                                    <div className='flex items-center'>
                                                        <Link href='' className="block py-4 w-full underline text-right text-[#201F1D] hover:text-red-400" onClick={() => removeProductFromCart(item.id)}><p>Remove</p></Link>
                                                    </div>
                                                </div>
                                            ))
                                        )
                                }
                            </div>
                        ) :
                    activeTab === 'shipping'
                        ? (
                            <form className='w-full'>
                                <div className='flex gap-4'>
                                    <div className="relative w-full mb-4 group">
                                        <input type="text" name="firstname" id="firstname" className="block py-4 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer" placeholder=" " required />
                                        <label htmlFor="firstname" className="peer-focus:font-medium absolute text-white duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">first name</label>
                                    </div>
                                    <div className="relative w-full mb-4 group">
                                        <input type="text" name="lastname" id="lastname" className="block py-4 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer" placeholder=" " required />
                                        <label htmlFor="lastname" className="peer-focus:font-medium absolute text-white duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">last name</label>
                                    </div>
                                </div>
                                <div className="relative w-full mb-4 group">
                                    <input type="email" name="email" id="email" className="block py-4 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer" placeholder=" " required />
                                    <label htmlFor="email" className="peer-focus:font-medium absolute text-white duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">email address</label>
                                </div>
                                <div className="relative w-full mb-4 group">
                                    <input type="password" name="password" id="password" className="block py-4 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer" placeholder=" " required />
                                    <label htmlFor="password" className="peer-focus:font-medium absolute text-white duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">password</label>
                                </div>
                                <div className="relative w-full mb-4 group">
                                    <input type="password" name="cpassword" id="cpassword" className="block py-4 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer" placeholder=" " required />
                                    <label htmlFor="cpassword" className="peer-focus:font-medium absolute text-white duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">confirm password</label>
                                </div>
                                <Button position='w-full py-2 mt-4' onClick={handleRequest}>sign up</Button>
                            </form>
                        )
                        : (
                            <form className='w-full'>
                                <div className="relative w-full mb-6 group">
                                    <input type="email" name="email" id="email" className="block py-4 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer" placeholder=" " required />
                                    <label htmlFor="email" className="peer-focus:font-medium absolute text-white duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">email address</label>
                                </div>
                                <div className="relative w-full group">
                                    <input type="password" name="password" id="password" className="block py-4 w-full bg-transparent border-0 border-b-2 border-white focus:outline-none focus:border-white peer" placeholder=" " required />
                                    <label htmlFor="password" className="peer-focus:font-medium absolute text-white duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">password</label>
                                </div>
                                <div className="relative w-full mb-6 group">
                                    <Link href='' className="block py-4 w-full underline text-right text-[#201F1D] hover:text-blue-600"><p>forgot your password?</p></Link>
                                </div>
                                <Button position='w-full py-2' onClick={handleRequest}>sign in</Button>
                            </form>
                        )
                }
            </div>
        </div>
        <div className="h-[80%] w-96 mr-12 flex flex-col items-center justify-center py-12 bg-[#4C4B48] shadow-lg drop-shadow-lg shadow-[#201F1D]">
            <form className='w-[80%]'>
                <div className='flex flex-col gap-6'>
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
                        <Button position='w-full py-2' onClick={handleRequest}>Checkout</Button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Cart