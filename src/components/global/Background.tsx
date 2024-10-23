import React from "react";
import Image from "next/image";
import Logo from "../../assets/logo.png";

const Background = () => {
  return (
    <div className="flex w-full h-full absolute -z-10 opacity-35 items-center justify-center">
      <Image
        src={Logo}
        alt="logo"
        className="w-full h-[50%] mb-0 lg:w-[60%] lg:h-full object-cover opacity-15 mt-auto"
      />
    </div>
  );
};

export default Background;
