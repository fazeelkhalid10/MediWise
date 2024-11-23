import React from 'react';
import Image from 'next/image';
import styles from "@/styles/Landing.module.css";


export default function LandingPage(){
  const carouselItems = [
    { id: 1, image: '/first.avif', alt: 'Pharmacy interior' },
    { id: 2, image: '/images.jpeg', alt: 'Medicine bottles' },
    { id: 3, image: '/third.jpg', alt: 'Healthcare professional' },
  ];

  return (
    <div className={styles.landingPage}>
      <section className={styles.carousel}>
        {carouselItems.map((item) => (
          <div key={item.id} className={styles.carouselItem}>
            <Image src={item.image} alt={item.alt} width={800} height={400} layout="responsive" />
          </div>
        ))}
      </section>

      <section className={styles.welcome}>
        <h1>Welcome to Our Pharmacy</h1>
        <p>Your trusted partner in health and wellness</p>
      </section>

      <section className={styles.features}>
        <div className={styles.feature}>
          <Image src="/first.avif" alt="Prescription" width={200} height={200} />
          <h2>Prescription Services</h2>
          <p>Fast and accurate prescription filling by our expert pharmacists</p>
        </div>
        <div className={styles.feature}>
          <Image src="/first.jpg" alt="Consultation" width={200} height={200} />
          <h2>Health Consultations</h2>
          <p>One-on-one consultations with our knowledgeable healthcare professionals</p>
        </div>
        <div className={styles.feature}>
          <Image src="/first.jpg" alt="Delivery" width={200} height={200} />
          <h2>Home Delivery</h2>
          <p>Convenient home delivery service for your medications and health products</p>
        </div>
      </section>

      <section className={styles.about}>
        <h2>About Us</h2>
        <p>We are committed to providing high-quality pharmaceutical services and products to our community. With years of experience and a dedicated team, we ensure that your health is in good hands.</p>
        <Image src="/first.jpg" alt="Our team" width={600} height={300} layout="responsive" />
      </section>
    </div>
  );
};



