import "@/styles/globals.css";
import "@/styles/Custom.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css'
import { SessionProvider } from "next-auth/react";
import { CartContextProvider } from "@/helper/cart-context";

export default function App({ Component, pageProps }) {
  return (
 
    <SessionProvider session={pageProps.session}>
  <CartContextProvider>
  <Component {...pageProps} />;
  </CartContextProvider>
  </SessionProvider>
 

  )
}
