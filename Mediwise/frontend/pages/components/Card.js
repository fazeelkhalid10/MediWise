import React from 'react'
import styles from "@/styles/Card.module.css";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
export default function Card() {

  const router=useRouter();
  return (
    <div>
      <div onClick={()=>{router.push("/products/3")}} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image src="" alt={name} width={200} height={200} layout="responsive" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>heloo</h3>
        <p className={styles.description}>hello</p>
        <p className={styles.price}>12000</p>
        <Link href="/products/3" className={styles.button}>
          View Details of
        </Link>
      </div>
    </div>
    </div>
  )
}
