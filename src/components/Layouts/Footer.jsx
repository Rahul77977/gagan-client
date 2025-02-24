import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import "./Footer.css";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email.trim() === "") {
      toast.error("Please enter a valid email!");
      return;
    }
    toast.success("Subscribed successfully! Check your inbox.");
    setEmail("");
  };

  return (
    <footer className="footer">
      <Toaster />
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h3>Join our newsletter</h3>
              <p className="text-muted">Get the latest updates and exclusive offers</p>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control newsletter-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleSubscribe} className="btn newsletter-btn d-flex align-items-center">
                  Join <ArrowRight className="ms-2" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container">
        <div className="row g-4 animate-footer">
          {/* Company Info */}
          <div className="col-lg-3 col-md-6">
            <h4 className="brand-name">Gagan Delux Lodge</h4>
            <p className="text-muted mb-4">
              Beside Delux Oven Bakery, Opposite Rural Police Station, Chikkaballapura-562101. Exceeding expectations for every stay.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="social-icon facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-icon twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-icon instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-icon youtube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-6">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="list-unstyled">
              {['About Us', 'Rooms', 'Facilities', 'Gallery', 'Contact'].map((item) => (
                <li key={item} className="mb-2">
                  <a href="#" className="footer-link">
                    <ArrowRight size={18} />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h4 className="footer-title">Contact Us</h4>
            <ul className="list-unstyled">
              <li className="contact-item">
                <span className="contact-icon">
                  <MapPin size={20} />
                </span>
                <span>Chikkaballapura-562101, Karnataka</span>
              </li>
              <li className="contact-item">
                <span className="contact-icon">
                  <Phone size={20} />
                </span>
                <span>Landline: 08156 450587</span>
              </li>
              <li className="contact-item">
                <span className="contact-icon">
                  <Phone size={20} />
                </span>
                <span>Phone: 8073268581</span>
              </li>
              <li className="contact-item">
                <span className="contact-icon">
                  <Phone size={20} />
                </span>
                <span>Mobile: 8217305467</span>
              </li>
              <li className="contact-item">
                <span className="contact-icon">
                  <Mail size={20} />
                </span>
                <span><a href="mailto:info@gagandeluxlodge.com">info@gagandeluxlodge.com</a></span>
              </li>
            </ul>
          </div>

          {/* Why Choose Us */}
          <div className="col-lg-3 col-md-6">
            <h4 className="footer-title">Our Facilities</h4>
            <ul className="list-unstyled">
              <li className="contact-item">
                <span className="contact-icon">
                  <Truck size={20} />
                </span>
                <span>Free Parking Available</span>
              </li>
              <li className="contact-item">
                <span className="contact-icon">
                  <CreditCard size={20} />
                </span>
                <span>24/7 Room Service</span>
              </li>
              <li className="contact-item">
                <span className="contact-icon">
                  <ShieldCheck size={20} />
                </span>
                <span>High Security</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom mt-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p className="mb-0">
                © 2024 Gagan Delux Lodge. All rights reserved.
              </p>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-center justify-content-md-end gap-4">
                {['Privacy Policy', 'Terms of Service', 'FAQ'].map((item) => (
                  <a 
                    key={item} 
                    href="#" 
                    className="footer-bottom-link"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
