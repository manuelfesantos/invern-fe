'use client'
import React, { useState } from 'react'
import { faChevronDown,faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import {AnimatePresence, motion} from 'framer-motion'
import { collectionsMock } from '../mocks/collections'
import Image from 'next/image'
import MenuAnimation from './MenuAnimation'
import ItemAnimation from './ItemAnimation'

export default function ShopMenu() {
    const [menu,setMenu] = useState(false);
    const [collections, setCollections] = useState(false);

    const style = 'absolute left-0 w-screen mt-[11px] bg-[#7D7C7C] bg-opacity-95 p-8 origin-top'

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

    return (
        <>
            <div onClick={toggleMenu}>
                <Link href='' className='link-underline'>
                    shop
                        {
                            !menu ? (
                                <FontAwesomeIcon icon={faChevronDown} size='2xs' className='pl-2' />
                            )

                            : (
                                <FontAwesomeIcon icon={faChevronUp} size='2xs' className='pl-2' />
                            )
                        }
                </Link>

            </div>
            <AnimatePresence>
                {
                    menu && (
                        <MenuAnimation scale={'scaleY'} style={style} closeCollections={closeCollections}>
                            <motion.div
                                variants={stagger}
                                initial="initial"
                                animate="open"
                                exit="initial"
                                className='flex flex-col justify-center gap-4'>
                                    <div className='flex flex-col items-center'>
                                        <ItemAnimation>
                                            <Link href='/shop/collections'><h4>By Collection</h4></Link>
                                        </ItemAnimation>
                                    </div>
                                    <div className='px-[46%]'>
                                        <hr />
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <ItemAnimation>
                                            <Link href='/shop/products'><h4>By Product</h4></Link>
                                        </ItemAnimation>
                                    </div>
                            </motion.div>
                        </MenuAnimation>
                    )
                }
            </AnimatePresence>
        </>
    )
}

/*
                        <MenuAnimation scale={'scaleY'} style={style} closeCollections={closeCollections}>
                            <motion.div
                                variants={stagger}
                                initial="initial"
                                animate="open"
                                exit="initial"
                                className='flex flex-col justify-center gap-4'>
                                    <div className='flex flex-col items-center w-full'>
                                        <div onMouseEnter={openCollections}>
                                            <ItemAnimation>
                                                <Link href='/shop/collections'><h4>By Collection</h4></Link>
                                            </ItemAnimation>
                                        </div>
                                        {
                                            collections && (
                                                <>
                                                    <div className='flex flex-col gap-2 my-6 w-full'>
                                                        {
                                                            collectionsMock.map((item,index) => (
                                                                <div key={index} className="flex flex-col items-center justify-center gap-2 bg-[#201F1D] h-24 w-full image-scale shadow-lg drop-shadow-lg shadow-[#201F1D]">
                                                                    <div className='relative w-full'>
                                                                        <Link href={`/shop/collections/${item.name}`}><Image src={item.products[0].images[0]} width={100} height={100} alt="..." className='h-24 w-full object-cover mix-blend-overlay grayscale opacity-75 brightness-75 hover:mix-blend-exclusion hover:opacity-50 hover:brightness-150' /></Link>
                                                                    </div>
                                                                    <div className='absolute'>
                                                                        <Link href={`/shop/collections/${item.name}`}><h4>{item.name}</h4></Link>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </>

                                            )
                                        }
                                    </div>
                                    <div className='px-[46%]'>
                                        <hr />
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <ItemAnimation>
                                            <Link href='/shop/products'><h4>By Product</h4></Link>
                                        </ItemAnimation>
                                    </div>
                            </motion.div>
                        </MenuAnimation>
*/