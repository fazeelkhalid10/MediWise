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
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.5513466616344!2d74.30043917486847!3d31.481525749061543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903f08ebc7e8b%3A0x47e934f4cd34790!2sFAST%20NUCES%20Lahore!5e0!3m2!1sen!2s!4v1714144292400!5m2!1sen!2s"
      className={styles.googleMap}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="FAST NUCES Lahore Location"
    ></iframe>
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

