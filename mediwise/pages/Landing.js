import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from "@/styles/Landing.module.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ChevronLeft, ChevronRight, Percent, BadgePercent, ArrowUp, Package, LayoutGrid, ArrowUpCircle, MessageCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';


export default function LandingPage(){
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  const bannerItems = [
    { id: 1, image: '/img2.png', alt: 'Friday Sale Brochure' },
    { id: 2, image: '/img4.png', alt: 'Free Delivery Brochure' },
    { id: 3, image: '/img1.png', alt: 'New Products Brochure' },
    { id: 4, image: '/img5.png', alt: 'Health Tips Brochure' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const goToPrevious = () => {
    setCurrentBannerIndex((prevIndex) => 
      prevIndex === 0 ? bannerItems.length - 1 : prevIndex - 1
    );
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const goToNext = () => {
    setCurrentBannerIndex((prevIndex) => 
      prevIndex === bannerItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const saleItems = [

  ];

  const topSellingItems = [

  ];

  const bundles = [

  ];

  
const{data:session,status}=useSession();

if(status==="loading")
  {

return <>Loading...</>


  }


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

    

     

        <section className={styles.bundles}>
          <h2 className={styles.sectionTitle}>
            Featured Products
            <BadgePercent className={styles.sectionIcon} />
          </h2>
          <div className={styles.itemGrid}>
            {products.filter(x=>x.isfeature===true).map((item) => (
              <div key={item.id} className={styles.item}>
              <Image src={item.image} alt={item.name} width={150} height={150} />
              <h3>{item.name}</h3>
              <p className={styles.price}>${item.price.toFixed(2)}</p>
              <Link href={`/products/${item._id}`} className={styles.button}>View Details</Link>
            </div>
            ))}
          </div>
          <div className={styles.seeMoreContainer}>
            <Link href="/AllProduct" className={styles.seeMoreButton}>See More</Link>
          </div>
        </section>

        <section className={styles.allItems}>
          <h2 className={styles.sectionTitle}>
            All Items
            <LayoutGrid className={styles.sectionIcon} />
          </h2>
          <div className={styles.itemGrid}>
            {products.map((item) => (
              <div key={item.id} className={styles.item}>
                <Image src={item.image} alt={item.name} width={150} height={150} />
                <h3>{item.name}</h3>
                <p className={styles.price}>${item.price.toFixed(2)}</p>
                <Link href={`/products/${item._id}`} className={styles.button}>View Details</Link>
              </div>
            ))}
          </div>
          <div className={styles.seeMoreContainer}>
            <Link href="/AllProduct" className={styles.seeMoreButton}>See More</Link>
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
       

       
        
          <button onClick={scrollToTop} className={styles.scrollTopButton}>
            <ArrowUpCircle size={24} />
          </button>
        

        <Link href="/About" className={styles.aboutUsButton}>
          <MessageCircle size={24} />
        </Link>
      </div>
      <Footer/>
    </>
  );
};

