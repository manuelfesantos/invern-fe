import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header/Header";
import { CartProvider } from "@/context/cart";
import { createTheme, ThemeProvider } from "@mui/system";
export const runtime = "experimental-edge";


export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#201F1D",
        dark: "#201F1D",
        light: "#4C4B48",
        contrastText: "#47372A",
      },
      secondary: {
        main: "#4C4B48",
        dark: "#201F1D",
        light: "#4C4B48",
        contrastText: "#47372A",
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <CartProvider>
          <Header />
          <Component {...pageProps} />
        </CartProvider>
      </ThemeProvider>
    </>
  );
}
