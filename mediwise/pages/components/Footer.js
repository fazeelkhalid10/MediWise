import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import styles from '@/styles/footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
            <h3 className={styles.title}>About MediWise</h3>
            <p className={styles.description}>Your trusted pharmacy for all your healthcare needs. We're committed to providing quality products and exceptional service.</p>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.icon}>
                <Facebook size={24} />
              </a>
              <a href="#" className={styles.icon}>
                <Twitter size={24} />
              </a>
              <a href="#" className={styles.icon}>
                <Instagram size={24} />
              </a>
            </div>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>Quick Links</h3>
            <ul className={styles.linkList}>
              <li><Link href="/about" className={styles.link}>About Us</Link></li>
              <li><Link href="/products" className={styles.link}>Our Products</Link></li>
              <li><Link href="/services" className={styles.link}>Services</Link></li>
              <li><Link href="/blog" className={styles.link}>Blog</Link></li>
              <li><Link href="/contact" className={styles.link}>Contact Us</Link></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>Customer Service</h3>
            <ul className={styles.linkList}>
              <li><Link href="/faq" className={styles.link}>FAQ</Link></li>
              <li><Link href="/shipping" className={styles.link}>Shipping & Returns</Link></li>
              <li><Link href="/privacy" className={styles.link}>Privacy Policy</Link></li>
              <li><Link href="/terms" className={styles.link}>Terms & Conditions</Link></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>Contact Us</h3>
            <ul className={styles.linkList}>
              <li className={styles.contactItem}>
                <MapPin size={18} className={styles.contactIcon} />
                123 Pharmacy Street, City, State 12345
              </li>
              <li className={styles.contactItem}>
                <Phone size={18} className={styles.contactIcon} />
                (123) 456-7890
              </li>
              <li className={styles.contactItem}>
                <Mail size={18} className={styles.contactIcon} />
                info@mediwise.com
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} MediWise Pharmacy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

