'use client'
import React, { useState } from 'react'
import { faChevronDown,faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import {AnimatePresence, motion} from 'framer-motion'
import MenuAnimation from './MenuAnimation'
import ItemAnimation from './ItemAnimation'

export default function ShopMenu() {
    const [menu,setMenu] = useState(false);

    const style = 'absolute left-0 w-screen mt-[11px] bg-[#4C4B48] bg-opacity-95 p-8 origin-top'

    const toggleMenu = () => {
        setMenu(!menu);
    };

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
                        <MenuAnimation scale={'scaleY'} style={style}>
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