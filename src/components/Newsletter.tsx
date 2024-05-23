'use client'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'
import {AnimatePresence, motion} from 'framer-motion'
import MenuAnimation from './MenuAnimation'
import ItemAnimation from './ItemAnimation'
import { CustomButton } from './CustomComponents'

export default function Newsletter() {
    const [menu,setMenu] = useState(false);

    const style = 'absolute top-16 left-12 mt-[3px] bg-[#4C4B48] bg-opacity-95 p-8 origin-top card-shadow'

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
                <Link href='' className="icon-scale"><FontAwesomeIcon icon={faNewspaper} /></Link>
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
                                    <ItemAnimation>
                                        <h5>Subscribe to our newsletter: </h5>
                                    </ItemAnimation>
                                    <ItemAnimation>
                                        <input type="email" name="email" id="email" className="block p-1 w-full focus:outline-none text-black" placeholder="email" required />
                                    </ItemAnimation>
                                    <ItemAnimation>
                                        <CustomButton position='h-full w-full p-2'>subscribe</CustomButton>
                                    </ItemAnimation>
                            </motion.div>
                        </MenuAnimation>
                    )
                }
            </AnimatePresence>
        </>
    )
}