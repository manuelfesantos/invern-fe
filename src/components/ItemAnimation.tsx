import React from 'react'
import { motion } from 'framer-motion'

const ItemAnimation = ({children}:{children:any}) => {
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
    <div className='overflow-hidden'>
        <motion.div variants={linksAnimation}>
            {children}
        </motion.div>
    </div>
  )
}

export default ItemAnimation