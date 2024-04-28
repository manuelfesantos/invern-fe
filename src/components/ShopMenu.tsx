'use client'
import React, { useState } from 'react'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import {AnimatePresence, motion} from 'framer-motion'
import { collectionsMock } from '../mocks/collections'
import Image from 'next/image'

export default function ShopMenu() {
    const [menu,setMenu] = useState(false);
    const [collections, setCollections] = useState(false);

    const toggleMenu = () => {
        setMenu(!menu);
        setCollections(false)
    };

    const openCollections = () => {
        setCollections(true)
    }

    const closeCollections = () => {
        setCollections(false)
    }

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
              delay: 0.25,
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
            y: "200vh",
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
                onClick={toggleMenu}
                className='relative px-4 py-2 text-white'>
                    <Link href='' className='link-underline'>shop <FontAwesomeIcon icon={faChevronDown} size='2xs' /></Link>
            </button>
            <AnimatePresence>
                {
                    menu && (
                        <motion.div
                            variants={menuAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className='absolute left-0 w-screen mt-1 bg-[#4C4B48] p-6 origin-top bg-opacity-90'>
                                <motion.div
                                    variants={stagger}
                                    initial="initial"
                                    animate="open"
                                    exit="initial"
                                    className='flex flex-col items-center justify-center' onMouseLeave={closeCollections}>
                                        <div className='flex flex-col items-center'>
                                            <div onMouseEnter={openCollections} >
                                                <div className='mb-4 overflow-hidden'>
                                                    <motion.div variants={linksAnimation}>
                                                        <Link href='shop/collections'><p className='text-2xl'>collections</p></Link>
                                                    </motion.div>
                                                </div>
                                            </div>
                                            {
                                                collections && (
                                                    <div className='flex gap-4'>
                                                        {
                                                            collectionsMock.map((item,index) => (
                                                                <div key={index} className="flex flex-col gap-2">
                                                                    <div className='overflow-hidden'>
                                                                        <motion.div variants={linksAnimation}>
                                                                            <Link href={`/shop/collections/${item.name}`}>{item.name}</Link>
                                                                        </motion.div>
                                                                    </div>
                                                                    <div className='overflow-hidden'>
                                                                        <motion.div variants={linksAnimation}>
                                                                        <Link href={`/shop/collections/${item.name}`}><Image src={item.products[0].images[0]} width={100} height={100} alt="..." className='h-36 w-36 object-cover image-scale' /></Link>
                                                                        </motion.div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                )
                                            }
                                            <div>
                                                <hr/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='overflow-hidden mt-4'>
                                                <motion.div variants={linksAnimation}>
                                                    <Link href='/shop/everything'><p className='text-2xl'>everything</p></Link>
                                                </motion.div>
                                            </div>
                                        </div>
                                </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </>
    )
}