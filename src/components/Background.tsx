import React from 'react';
import Image from 'next/image';
import Logo from '../assets/logo.png';

const Background = () => {
  return (
    <div className="flex w-full h-full absolute z-[-1] opacity-35 items-center justify-center">
        <Image src={Logo} alt='logo' className="w-[50%] h-full object-cover opacity-15"/>
    </div>
  )
}

export default Background