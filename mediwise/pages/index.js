
import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Login from './login';
import LandingPage from "./Landing";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {

  const { data: session, status } = useSession(); // Track session and status
  const [page, setPage] = useState("nothing");

  useEffect(() => {
    if (status === 'loading') return; // Wait until session is loading
    if (session) {
      setPage("Product");
    } else {
      setPage("register");
    }
  }, [session, status]);

  if (page === "nothing") {
    return <div>Loading...</div>; //We can Show a loading screen 
  }
   
  return page === "Product" ? <LandingPage/> :<Login/>


  
}
