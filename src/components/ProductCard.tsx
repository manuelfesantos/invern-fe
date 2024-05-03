import React from 'react'
import Image from 'next/image'
import Button from './Button'

const ProductCard = ({item}:{item:any}) => {
  return (
    <div className="w-full bg-[#4C4B48] shadow-lg drop-shadow-lg shadow-[#201F1D]">
        <div>
            <Image src={item.images[0]} height={100} width={100} alt="..." className='h-72 w-72 object-cover aspect-square' />
        </div>
        <div className="px-4 pb-4 pt-2">
            <h5>{item.name}</h5>
            <div className="flex items-center justify-between">
                <h3 className='font-extrabold justify-self-center'>{item.price}€</h3>
                <Button position="px-4 py-2" onClick=''>add to cart</Button>
            </div>
        </div>
    </div>
  )
}

export default ProductCard