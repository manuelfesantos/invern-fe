import React from 'react'
import {motion} from 'framer-motion'

const MenuAnimation = ({children, scale, style, closeCollections}:{children:any,scale:string,style:string,closeCollections?:any}) => {
    const menuAnimation = {
        initial: {
            [scale]: 0,
          },
          animate: {
            [scale]: 1,
            transition: {
              duration: 0.5,
              ease: [0.12, 0, 0.39, 0],
            },
          },
          exit: {
            [scale]: 0,
            transition: {
              delay: 0.25,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            },
          },
    }

  return (
      <motion.div
          variants={menuAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          className={style}
          onMouseLeave={closeCollections}>
              {children}
      </motion.div>
  )
}

export default MenuAnimation