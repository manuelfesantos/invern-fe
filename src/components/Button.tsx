import React from 'react'

const Button = ({children,position,onClick}:{children:string,position:string,onClick:any}) => {
  return (
    <button type="submit" onClick={onClick} className={`${position} bg-[#201F1D] hover:bg-blue-900`}>
        {children}
    </button>
  )
}

export default Button