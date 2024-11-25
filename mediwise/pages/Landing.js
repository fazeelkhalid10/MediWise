import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from "@/styles/Landing.module.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ChevronLeft, ChevronRight, Percent, BadgePercent, ArrowUp, Package, LayoutGrid, ArrowUpCircle, MessageCircle } from 'lucide-react';


export default function LandingPage(){
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  
  const bannerItems = [
    { id: 1, image: '/sale-sale.jpg', alt: 'Friday Sale Brochure' },
    { id: 2, image: '/free-delivery.jpg', alt: 'Free Delivery Brochure' },
    { id: 3, image: '/new.jpg', alt: 'New Products Brochure' },
    { id: 4, image: '/medi.jpg', alt: 'Health Tips Brochure' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => 
        prevIndex === bannerItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentBannerIndex((prevIndex) => 
      prevIndex === 0 ? bannerItems.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentBannerIndex((prevIndex) => 
      prevIndex === bannerItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const saleItems = [
    { id: 1, name: 'Vitamin C Supplements', price: 9.99, salePrice: 7.99, image: '/vitamin-c.jpg' },
    { id: 2, name: 'Pain Relief Gel', price: 12.99, salePrice: 10.99, image: '/pain-relief.jpg' },
    { id: 3, name: 'Allergy Medicine', price: 15.99, salePrice: 13.99, image: '/allergy-med.jpg' },
    { id: 4, name: 'First Aid Kit', price: 24.99, salePrice: 19.99, image: '/first-aid.jpg' },
    { id: 5, name: 'Musa ki Bund', price: 99.99, salePrice: 9.99, image: '/musa.jfif' },
  ];

  const topSellingItems = [
    { id: 1, name: 'Multivitamin Complex', price: 19.99, image: '/multivitamin.jpg' },
    { id: 2, name: 'Antibacterial Hand Sanitizer', price: 3.99, image: '/hand-sanitizer.jpg' },
    { id: 3, name: 'Digital Thermometer', price: 14.99, image: '/thermometer.jpg' },
    { id: 4, name: 'Omega-3 Fish Oil', price: 22.99, image: '/fish-oil.jpg' },
    { id: 5, name: 'Musa ki Bund', price: 99.99,  image: '/musa.jfif' },
  ];

  const bundles = [
    { id: 1, name: 'Cold & Flu Relief Bundle', price: 29.99, image: '/cold-flu-bundle.jpg' },
    { id: 2, name: 'Skincare Essentials Bundle', price: 39.99, image: '/skincare-bundle.jpg' },
    { id: 3, name: 'Wellness Starter Pack', price: 49.99, image: '/wellness-bundle.jpg' },
    { id: 4, name: 'Skincare Essentials Bundle', price: 39.99, image: '/skincare-bundle.jpg' },
    { id: 5, name: 'Wellness Starter Pack', price: 49.99, image: '/wellness-bundle.jpg' },
  ];

  const allItems = [
    { id: 1, name: 'Aspirin', price: 5.99, image: '/aspirin.jpg' },
    { id: 2, name: 'Bandages', price: 3.99, image: '/bandages.jpg' },
    { id: 3, name: 'Cough Syrup', price: 8.99, image: '/cough-syrup.jpg' },
    { id: 4, name: 'Sunscreen SPF 50', price: 12.99, image: '/sunscreen.jpg' },
    { id: 5, name: 'Protein Powder', price: 24.99, image: '/protein-powder.jpg' },
    { id: 6, name: 'Dental Floss', price: 2.99, image: '/dental-floss.jpg' },
    { id: 7, name: 'Eye Drops', price: 7.99, image: '/eye-drops.jpg' },
    { id: 8, name: 'Lip Balm', price: 3.49, image: '/lip-balm.jpg' },
    { id: 9, name: 'Eye Drops', price: 7.99, image: '/eye-drops.jpg' },
    { id: 10, name: 'Lip Balm', price: 3.49, image: '/lip-balm.jpg' },
  ];

  return (
    <>
      <Header/>
      <div className={styles.landingPage}>
        <section className={styles.banner}>
          {bannerItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`${styles.bannerItem} ${index === currentBannerIndex ? styles.active : ''}`}
            >
              <Image src={item.image} alt={item.alt} width={1200} height={400} layout="responsive" />
            </div>
          ))}
          <button className={`${styles.bannerButton} ${styles.bannerButtonLeft}`} onClick={goToPrevious}>
            <ChevronLeft size={30} />
          </button>
          <button className={`${styles.bannerButton} ${styles.bannerButtonRight}`} onClick={goToNext}>
            <ChevronRight size={30} />
          </button>
        </section>

        <section className={styles.saleItems}>
          <h2 className={styles.sectionTitle}>
            Sale Items
            <BadgePercent className={styles.sectionIcon} />
          </h2>
          <div className={styles.itemGrid}>
            {saleItems.map((item) => (
              <div key={item.id} className={styles.item}>
                <Image src={item.image} alt={item.name} width={200} height={200} />
                <h3>{item.name}</h3>
                <p className={styles.price}>
                  <span className={styles.oldPrice}>${item.price.toFixed(2)}</span> 
                  ${item.salePrice.toFixed(2)}
                </p>
                <Link href={`/product/${item.id}`} className={styles.button}>View Details</Link>
              </div>
            ))}
          </div>
          <div className={styles.seeMoreContainer}>
            <Link href="/sale-items" className={styles.seeMoreButton}>See More</Link>
          </div>
        </section>

        <section className={styles.topSelling}>
          <h2 className={styles.sectionTitle}>
            Top Selling Items
            <ArrowUp className={styles.sectionIcon} />
          </h2>
          <div className={styles.itemGrid}>
            {topSellingItems.map((item) => (
              <div key={item.id} className={styles.item}>
                <Image src={item.image} alt={item.name} width={200} height={200} />
                <h3>{item.name}</h3>
                <p className={styles.price}>${item.price.toFixed(2)}</p>
                <Link href={`/product/${item.id}`} className={styles.button}>View Details</Link>
              </div>
            ))}
          </div>
          <div className={styles.seeMoreContainer}>
            <Link href="/top-selling" className={styles.seeMoreButton}>See More</Link>
          </div>
        </section>

        <section className={styles.bundles}>
          <h2 className={styles.sectionTitle}>
            Special Bundles
            <Package className={styles.sectionIcon} />
          </h2>
          <div className={styles.itemGrid}>
            {bundles.map((bundle) => (
              <div key={bundle.id} className={styles.item}>
                <Image src={bundle.image} alt={bundle.name} width={200} height={200} />
                <h3>{bundle.name}</h3>
                <p className={styles.price}>${bundle.price.toFixed(2)}</p>
                <Link href={`/bundle/${bundle.id}`} className={styles.button}>View Bundle</Link>
              </div>
            ))}
          </div>
          <div className={styles.seeMoreContainer}>
            <Link href="/bundles" className={styles.seeMoreButton}>See More</Link>
          </div>
        </section>

        <section className={styles.allItems}>
          <h2 className={styles.sectionTitle}>
            All Items
            <LayoutGrid className={styles.sectionIcon} />
          </h2>
          <div className={styles.itemGrid}>
            {allItems.map((item) => (
              <div key={item.id} className={styles.item}>
                <Image src={item.image} alt={item.name} width={150} height={150} />
                <h3>{item.name}</h3>
                <p className={styles.price}>${item.price.toFixed(2)}</p>
                <Link href={`/product/${item.id}`} className={styles.button}>View Details</Link>
              </div>
            ))}
          </div>
          <div className={styles.seeMoreContainer}>
            <Link href="/all-items" className={styles.seeMoreButton}>See More</Link>
          </div>
        </section>

        {/* <section className={styles.features}>
          <h2 className={styles.sectionTitle}>Our Services</h2>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <Image src="/prescription-service.jpg" alt="Prescription" width={200} height={200} />
              <h3>Prescription Services</h3>
              <p>Fast and accurate prescription filling by our expert pharmacists</p>
            </div>
            <div className={styles.feature}>
              <Image src="/health-consultation.jpg" alt="Consultation" width={200} height={200} />
              <h3>Health Consultations</h3>
              <p>One-on-one consultations with our knowledgeable healthcare professionals</p>
            </div>
            <div className={styles.feature}>
              <Image src="/home-delivery.jpg" alt="Delivery" width={200} height={200} />
              <h3>Home Delivery</h3>
              <p>Convenient home delivery service for your medications and health products</p>
            </div>
          </div>
          <div className={styles.seeMoreContainer}>
            <Link href="/services" className={styles.seeMoreButton}>See More</Link>
          </div>
        </section>

        <section className={styles.about}>
          <h2 className={styles.sectionTitle}>About Us</h2>
          <p>We are committed to providing high-quality pharmaceutical services and products to our community. With years of experience and a dedicated team, we ensure that your health is in good hands.</p>
          <Image src="/our-team.jpg" alt="Our team" width={600} height={300} layout="responsive" />
          <div className={styles.seeMoreContainer}>
            <Link href="/about" className={styles.seeMoreButton}>Learn More</Link>
          </div>
        </section> */}
       
      </div>
      <Footer/>
    </>
  );
};

