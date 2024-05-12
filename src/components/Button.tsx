import React from 'react'

const Button = ({children,position,onClick,isDisabled}:{children:string,position:string,onClick?:() => void,isDisabled?:() => boolean}) => {
  return (
    <button type="submit" onClick={onClick} className={`${isDisabled && isDisabled() ? `${position} bg-[#4C4B48]` : `${position} bg-[#201F1D] hover:bg-blue-800`}`} disabled={isDisabled ? isDisabled() : false}>
        {children}
    </button>
  )
}

export default Button