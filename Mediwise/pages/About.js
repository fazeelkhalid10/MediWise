import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from "@/styles/about.module.css";
import landingStyles from "@/styles/Landing.module.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export default function AboutUs() {
  const [complaintSubmitted, setComplaintSubmitted] = useState(false);
  const [questionSubmitted, setQuestionSubmitted] = useState(false);

  const handleComplaintSubmit = (e) => {
    e.preventDefault();
    setComplaintSubmitted(true);
    setTimeout(() => setComplaintSubmitted(false), 3000);
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    setQuestionSubmitted(true);
    setTimeout(() => setQuestionSubmitted(false), 3000);
  };

  return (
    <>
      <Header />
      <main className={styles.aboutPage}>
        <section className={styles.aboutSection}>
          <div className={styles.aboutContent}>
            <h1>About MediWise Pharmacy</h1>
            <p>MediWise Pharmacy is a leading healthcare provider committed to improving the well-being of our community. With a legacy of excellence spanning over two decades, we pride ourselves on delivering top-quality pharmaceutical services and products.</p>
            <p>Our team of experienced pharmacists and healthcare professionals is dedicated to providing personalized care, expert advice, and a wide range of health solutions to meet your unique needs.</p>
          </div>
        </section>

        <section className={styles.locationSection}>
          <h2>Our Location</h2>
          <div className={styles.mapContainer}>
            <div className={styles.mapPlaceholder}>
              Google Maps will be displayed here
            </div>
          </div>
        </section>

        <section className={styles.formsSection}>
          <div className={styles.complaintForm}>
            <h2>Submit a Complaint</h2>
            <form onSubmit={handleComplaintSubmit}>
              <input type="text" placeholder="Order Number" required />
              <input type="text" placeholder="Delivery Status" required />
              <textarea placeholder="Describe your complaint" required></textarea>
              <button type="submit">Submit Complaint</button>
            </form>
            {complaintSubmitted && <div className={styles.alert}>Complaint submitted!</div>}
          </div>

          <div className={styles.questionForm}>
            <h2>Ask a Question</h2>
            <form onSubmit={handleQuestionSubmit}>
              <textarea placeholder="Your question" required></textarea>
              <button type="submit">Submit Question</button>
            </form>
            {questionSubmitted && <div className={styles.alert}>Question submitted!</div>}
          </div>
        </section>

        <section className={styles.foundersSection}>
          <h2>Our Founders</h2>
          <div className={styles.foundersGrid}>
          <div className={styles.founder}>
          <Image
            src="/musa.jfif?height=200&width=200"
            alt="Musa Bund"
            width={200}
            height={200}
             className={styles.founderImage}
          />
         <h3>Musa Bund</h3>
         <p>Expert in pharmaceutical operations and customer care "Bund Specialist"</p>
         </div>
        <div className={styles.founder}>
         <Image
           src="/placeholder.svg?height=200&width=200"
           alt="Fazeel Khalid"
           width={200}
           height={200}
           className={styles.founderImage}
         />
        <h3>Fazeel Khalid</h3>
        <p>Visionary leader with a passion for healthcare innovation</p>
        </div>
        <div className={styles.founder}>
        <Image
        src="/placeholder.svg?height=200&width=200"
        alt="Hassan Butt"
        width={200}
        height={200}
        className={styles.founderImage}
      />
      <h3>Hassan Butt</h3>
      <p>Specialist in health technology and digital pharmacy solutions</p>
    </div>
    </div>
   </section>
      </main>
      <Footer />
    </>
  );
}

