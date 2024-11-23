import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-3 mb-4">
            <h3>About MediWise</h3>
            <p className="mb-4">Your trusted pharmacy for all your healthcare needs. We're committed to providing quality products and exceptional service.</p>
            <div className="d-flex">
              <a href="#" className="footer-icon me-3">
                <Facebook size={24} />
              </a>
              <a href="#" className="footer-icon me-3">
                <Twitter size={24} />
              </a>
              <a href="#" className="footer-icon">
                <Instagram size={24} />
              </a>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 mb-4">
            <h3>Quick Links</h3>
            <ul className="list-unstyled">
              <li><Link href="/about" className="footer-link">About Us</Link></li>
              <li><Link href="/products" className="footer-link">Our Products</Link></li>
              <li><Link href="/services" className="footer-link">Services</Link></li>
              <li><Link href="/blog" className="footer-link">Blog</Link></li>
              <li><Link href="/contact" className="footer-link">Contact Us</Link></li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-3 mb-4">
            <h3>Customer Service</h3>
            <ul className="list-unstyled">
              <li><Link href="/faq" className="footer-link">FAQ</Link></li>
              <li><Link href="/shipping" className="footer-link">Shipping & Returns</Link></li>
              <li><Link href="/privacy" className="footer-link">Privacy Policy</Link></li>
              <li><Link href="/terms" className="footer-link">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-3 mb-4">
            <h3>Contact Us</h3>
            <ul className="list-unstyled">
              <li className="d-flex align-items-center mb-2">
                <MapPin size={18} className="me-2 text-warning" />
                123 Pharmacy Street, City, State 12345
              </li>
              <li className="d-flex align-items-center mb-2">
                <Phone size={18} className="me-2 text-warning" />
                (123) 456-7890
              </li>
              <li className="d-flex align-items-center">
                <Mail size={18} className="me-2 text-warning" />
                info@mediwise.com
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-border text-center">
          <p>&copy; {new Date().getFullYear()} MediWise Pharmacy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

