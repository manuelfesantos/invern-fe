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
            scaleY: 0,
          },
          animate: {
            scaleY: 1,
            transition: {
              duration: 0.5,
              ease: [0.12, 0, 0.39, 0],
            },
          },
          exit: {
            scaleY: 0,
            transition: {
              delay: 0.5,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            },
          },
    }
    const stagger = {
        initial: {
            transition: {
              staggerChildren: 0.025,
              staggerDirection: -1,
            },
        },
        open: {
            transition: {
              staggerChildren: 0.05,
              staggerDirection: 1,
            },
        },
    }
    const linksAnimation = {
        initial: {
            y: "30vh",
            transition: {
              duration: 0.5,
              ease: [0.37, 0, 0.63, 1],
            },
          },
          open: {
            y: 0,
            transition: {
              ease: [0, 0.55, 0.45, 1],
              duration: 0.7,
            },
          },
    };

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
                            className='absolute mt-1 bg-[#4C4B48] p-6 origin-top bg-opacity-90'>
                                <motion.div
                                    variants={stagger}
                                    initial="initial"
                                    animate="open"
                                    exit="initial"
                                    className='flex flex-col'>
                                        <div className='overflow-hidden'>
                                            <motion.div variants={linksAnimation}>
                                                <Link href='/shop/collections'>collections</Link>
                                            </motion.div>
                                        </div>
                                        <hr />
                                        <div className='flex pl-4 overflow-hidden'>
                                            {
                                                collectionsMock.map((item,index) => (
                                                    <div key={index} className="flex flex-col px-6">
                                                        <div className='overflow-hidden'>
                                                            <motion.div variants={linksAnimation}>
                                                                    <Link href={`/shop/collections/${item.name}`}>{item.name}</Link>
                                                            </motion.div>
                                                        </div>
                                                        <div className='flex flex-col pl-4'>
                                                            {
                                                                item.products.map((product,index) => (
                                                                    <div key={index} className='overflow-hidden'>
                                                                        <motion.div
                                                                            variants={linksAnimation}>
                                                                                <Link href=''>{product.name}</Link>
                                                                        </motion.div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className='overflow-hidden'>
                                            <motion.div variants={linksAnimation}>
                                                <Link href='/shop/everything'>everything</Link>
                                            </motion.div>
                                        </div>
                                </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </>
    )
}
