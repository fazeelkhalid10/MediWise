import React from 'react'
import styles from "@/styles/Card.module.css";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Card({pid,name,price,description}) {

  const router=useRouter();
  return (
    <div>
      <div onClick={()=>{router.push("/products/"+pid)}} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image src="" alt={name} width={200} height={200} layout="responsive" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
       

        <p className={styles.description}>{description}</p>
        <p className={styles.price}>{price}</p>
        <Link href={`/products/${pid}`} className={styles.button}>
          View Details of Product
        </Link>
      </div>
    </div>
    </div>
  )
}
