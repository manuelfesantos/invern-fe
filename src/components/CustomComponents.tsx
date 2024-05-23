import React from 'react'
import Link from 'next/link'

export const CustomButton = ({children,position,onClick,isDisabled}:{children:string,position:string,onClick?:() => void,isDisabled?:() => boolean}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled ? isDisabled() : false}
      className={`${isDisabled && isDisabled() ? `${position} bg-[#4C4B48]` : `${position} bg-[#201F1D] hover:bg-[#C36A2D]`}`}>
        {children}
    </button>
  )
}

export const CustomLink = ({children,position,onClick,href,state}:{children:any,position:string,onClick?:() => void,href:string,state:boolean}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${position} text-[#E88A1A] ${state ? `hover:text-[#ECB365]` : `hover:text-red-500`} `}>
        {children}
    </Link>
  )
}