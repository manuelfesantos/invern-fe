import { useEffect, useState } from "react";

export default function About() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("/api/helloworld")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  return (
    <>
      <h1>ABOUT</h1>
      <p>{message}</p>
    </>
  );
}
