import React from 'react';
import Image from 'next/image';
import Logo from '../assets/logo.png';

const Background = () => {
  return (
    <div className="flex w-full h-full absolute z-[-1] opacity-35">
        <Image src={Logo} alt='logo' className="w-full h-full object-cover opacity-15"/>
    </div>
  )
}

export default Background