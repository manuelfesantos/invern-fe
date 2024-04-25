'use client'
import React, { useState } from 'react'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import {AnimatePresence, motion} from 'framer-motion'
import { collectionsMock } from '../mocks/collections'

export default function ShopMenu() {
    const [isOpen,setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    const menuAnimation = {
        initial: {
            scaleY: 0
        },
        animate: {
            scaleY: 1,
            transition: {
                duration: 0.25,
                ease: [0.12, 0, 0.39, 0]
            }
        },
        exit: {
            scaleY: 0,
            transition: {
                duration: 0.25,
                ease: [0.12, 0, 0.39, 1]
            }
        }
    }

    return (
        <>
            <button
                onMouseEnter={handleMouseEnter}
                className='relative px-4 py-2 text-white'>
                    <Link href='' className='link-underline'>shop <FontAwesomeIcon icon={faChevronDown} size='2xs' /></Link>
            </button>
            <AnimatePresence>
                {
                    isOpen && (
                        <motion.div
                            variants={menuAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            onMouseLeave={handleMouseLeave}
                            className='absolute -ml-12 mt-1 flex flex-col bg-[#4C4B48] p-6 origin-top bg-opacity-85 z-[-1]'>
                                <div className="">
                                    <Link href='/shop/collections'>collections</Link>
                                    <hr />
                                    <div className='flex pl-4'>
                                        {
                                            collectionsMock.map((item,index) => (
                                                <div className="flex flex-col px-6">
                                                    <Link key={index} href={`/shop/collections/${item.name}`}>{item.name}</Link>
                                                    <div className='flex flex-col pl-4'>
                                                        {
                                                            item.products.map((product,index) => (
                                                                <Link key={index} href=''>{product.name}</Link>)
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <Link href='/shop/everything'>everything</Link>
                                </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </>
    )
}