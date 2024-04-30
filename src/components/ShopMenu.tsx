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
import { Anonymous_Pro } from 'next/font/google'

export default function ShopMenu() {
    const [menu,setMenu] = useState(false);
    const [collections, setCollections] = useState(false);

    const style = 'absolute left-0 w-screen mt-3 bg-[#4C4B48] p-8 origin-top bg-opacity-90'

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
                                        <div onMouseEnter={openCollections}>
                                            <ItemAnimation>
                                                <Link href='/shop/collections'><h3>collections</h3></Link>
                                            </ItemAnimation>
                                        </div>
                                        {
                                            collections && (
                                                <>
                                                    <div className='flex gap-2 my-6'>
                                                        {
                                                            collectionsMock.map((item,index) => (
                                                                <div key={index} className="flex flex-col items-center justify-center gap-2">
                                                                    <div className='relative'>
                                                                        <ItemAnimation>
                                                                            <Link href={`/shop/collections/${item.name}`}><Image src={item.products[0].images[0]} width={100} height={100} alt="..." className='h-36 w-36 object-cover mix-blend-overlay opacity-75 image-scale' /></Link>
                                                                        </ItemAnimation>
                                                                    </div>
                                                                    <div className='absolute'>
                                                                        <ItemAnimation>
                                                                            <Link href={`/shop/collections/${item.name}`}><p>{item.name}</p></Link>
                                                                        </ItemAnimation>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </>

                                            )
                                        }
                                    </div>
                                    <div className='px-[47%]'>
                                        <hr />
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <ItemAnimation>
                                            <Link href='/shop/everything'><h3>everything</h3></Link>
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