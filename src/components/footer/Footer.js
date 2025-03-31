import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import Button from '../button/Button';
import { footerLinks, socialLinks } from '../../constants/footer_links';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container container-fluid">
        <div className="footer-content grid-container">
          {footerLinks.map((section, index) => (
            <div key={index} className="footer-column flex-column">
              <h3>{section.title}</h3>
              <ul>
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer-column newsletter-column flex-column">
            <h3>SIGN UP FOR OUR NEWSLETTER</h3>
            <div className="newsletter-form flex-row">
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                aria-label="Your email address"
              />
              <Button type="submit" aria-label="Subscribe" size="medium">
                Subscribe
              </Button>
            </div>
            <div className="social-links flex-row">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.href} aria-label={social.label}>
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Everlast Boxing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 