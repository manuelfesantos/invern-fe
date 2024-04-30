'use client'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight,faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { AnimatePresence, motion} from 'framer-motion'
import Link from 'next/link'
import MenuAnimation from './MenuAnimation'
import ItemAnimation from './ItemAnimation'

const MobileMenu = () => {
    const [menu,setMenu] = useState(false);
    const [collections, setCollections] = useState(false);

    const style = "absolute top-0 left-0 origin-left flex flex-col items-center justify-center h-screen w-screen bg-[#4C4B48] z-10"

    const handleMenu = () => {
        setMenu(!menu)
        setCollections(false)
    }

    const handleCollectionsMenu = () => {
        setCollections(!collections)
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
    <nav className='lg:hidden mobile-menu'>
        {
            !menu && (
                <div className="absolute top-0 left-2 flex items-center justify-center h-full w-[5%] z-10">
                    <div onClick={handleMenu}>
                        <FontAwesomeIcon icon={faChevronRight} size='lg' />
                    </div>
                </div>
            )
        }
        <AnimatePresence>
            {
                menu && (
                    <MenuAnimation scale={'scaleX'} style={style}>
                        <motion.div
                            variants={stagger}
                            initial="initial"
                            animate="open"
                            exit="initial">
                                <div>
                                    <ul>
                                        <li>
                                            {
                                                !collections
                                                    ? (
                                                        <ItemAnimation>
                                                            <Link href='' onClick={handleCollectionsMenu} className='mobile-menu'>shop <FontAwesomeIcon icon={faChevronDown} className='text-3xl' /></Link>
                                                        </ItemAnimation>
                                                    )
                                                    : (
                                                        <>
                                                            <ItemAnimation>
                                                                <Link href='' onClick={handleCollectionsMenu} className='mobile-menu'>shop <FontAwesomeIcon icon={faChevronUp} className='text-3xl' /></Link>
                                                            </ItemAnimation>
                                                            <ItemAnimation>
                                                                <div className='flex flex-col ml-6 my-2 text-4xl'>
                                                                    <Link href='/shop/collections' onClick={handleMenu} className='mobile-menu'>collections</Link>
                                                                    <Link href='/shop/everything' onClick={handleMenu} className='mobile-menu'>everything</Link>
                                                                </div>
                                                            </ItemAnimation>
                                                        </>
                                                    )
                                            }
                                        </li>
                                        <li>
                                            <ItemAnimation>
                                                <Link href='/about' onClick={handleMenu} className='mobile-menu'>about</Link>
                                            </ItemAnimation>
                                        </li>
                                        <li>
                                            <ItemAnimation>
                                                <Link href='/contact' onClick={handleMenu} className='mobile-menu'>contact</Link>
                                            </ItemAnimation>
                                        </li>
                                        <li>
                                            <ItemAnimation>
                                                <Link href='/faq' onClick={handleMenu} className='mobile-menu'>faq</Link>
                                            </ItemAnimation>
                                        </li>
                                    </ul>
                                </div>
                                <div className="absolute top-0 right-2 flex items-center justify-center h-full w-[5%]">
                                    <div onClick={handleMenu}>
                                        <FontAwesomeIcon icon={faChevronLeft} size='lg' />
                                    </div>
                                </div>
                        </motion.div>
                    </MenuAnimation>
                )
            }
        </AnimatePresence>
    </nav>
  )
}

export default MobileMenu