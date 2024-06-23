import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons'
import { motion, AnimatePresence } from 'framer-motion';

export const Toast = ({message,type}:{message:string,type:boolean}) => {
  return (
    <AnimatePresence>
        {
            type
                ? (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className='fixed bottom-24 left-1/2 -ml-36 h-36 w-64 z-20 flex flex-col items-center justify-center gap-2 bg-green-700 bg-opacity-95 card-shadow'>
                            <FontAwesomeIcon icon={faCheckCircle} size='2x' />
                            <p>{message}</p>
                    </motion.div>
                )
                : (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className='fixed bottom-24 left-1/2 -ml-36 h-36 w-64 z-20 flex flex-col items-center justify-center gap-2 bg-red-700 bg-opacity-95 card-shadow'>
                            <FontAwesomeIcon icon={faXmarkCircle} size='2x' />
                            <p>{message}</p>
                    </motion.div>
                )
        }

    </AnimatePresence>
  )
}