"use client";
import { useEffect, useState } from "react";

const Test = () => {
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    const fetchMessage = async () => {
      const response = await fetch("/api", {
        headers: {
          [`${process.env.NEXT_PUBLIC_BFF_ID_KEY}`]: `${process.env.NEXT_PUBLIC_BFF_ID_VALUE}`,
          [`${process.env.NEXT_PUBLIC_BFF_SECRET_KEY}`]: `${process.env.NEXT_PUBLIC_BFF_SECRET_VALUE}`,
        },
      });
      const { message } = await response.json();
      setMessage(message);
    };
    fetchMessage();
  }, []);
  return <p>{message}</p>;
};

export default Test;
