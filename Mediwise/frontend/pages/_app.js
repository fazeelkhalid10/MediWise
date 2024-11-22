import "@/styles/globals.css";
import "@/styles/Custom.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css'
export default function App({ Component, pageProps }) {
  return (
  <>
    <Header/>
  <Component {...pageProps} />;
  <Footer/>
  </>
  )
}
