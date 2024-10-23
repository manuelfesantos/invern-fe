import React from "react";
import LoadingLogo from "../../assets/loading.gif";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 z-30 h-screen w-screen flex items-center justify-center bg-black bg-opacity-85">
      <Image src={LoadingLogo} alt="logo" className="h-64 w-64" />
    </div>
  );
};

export default Loading;
