import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header/Header";
import { CartProvider } from "@/context/cart";
export const runtime = "experimental-edge";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CartProvider>
        <Header />
        <Component {...pageProps} />
      </CartProvider>
    </>
  );
}
