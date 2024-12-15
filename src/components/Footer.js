import React from 'react';

function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={footerContentStyle}>
        <div style={footerColumnStyle}>
          <h4 style={footerHeadingStyle}>About Us</h4>
          <p style={footerTextStyle}>
            We are a company focused on providing exceptional services with a passion for innovation.
          </p>
        </div>

        <div style={footerColumnStyle}>
          <h4 style={footerHeadingStyle}>Quick Links</h4>
          <ul style={footerListStyle}>
            <li><a href="/" style={footerLinkStyle}>Home</a></li>
            <li><a href="/about" style={footerLinkStyle}>About</a></li>
            <li><a href="/services" style={footerLinkStyle}>Services</a></li>
            <li><a href="/contact" style={footerLinkStyle}>Contact</a></li>
          </ul>
        </div>

        <div style={footerColumnStyle}>
          <h4 style={footerHeadingStyle}>Follow Us</h4>
          <ul style={footerSocialLinksStyle}>
            <li><a href="https://facebook.com" style={footerSocialLinkStyle}>Facebook</a></li>
            <li><a href="https://twitter.com" style={footerSocialLinkStyle}>Twitter</a></li>
            <li><a href="https://instagram.com" style={footerSocialLinkStyle}>Instagram</a></li>
            <li><a href="https://linkedin.com" style={footerSocialLinkStyle}>LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div style={footerBottomStyle}>
        <p style={footerBottomTextStyle}>
          &copy; 2024 Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// Styles
const footerStyle = {
  backgroundColor: '#333',
  color: 'white',
  padding: '40px 20px',
  fontFamily: 'Arial, sans-serif',
};

const footerContentStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  marginBottom: '20px',
};

const footerColumnStyle = {
  flex: '1',
  padding: '10px',
  minWidth: '250px',
};

const footerHeadingStyle = {
  fontSize: '18px',
  marginBottom: '10px',
  fontWeight: 'bold',
};

const footerTextStyle = {
  fontSize: '14px',
};

const footerListStyle = {
  listStyleType: 'none',
  padding: '0',
  margin: '0',
};

const footerLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '14px',
  display: 'block',
  margin: '5px 0',
};

const footerSocialLinksStyle = {
  listStyleType: 'none',
  padding: '0',
  margin: '0',
};

const footerSocialLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '14px',
  display: 'block',
  margin: '5px 0',
};

const footerBottomStyle = {
  borderTop: '1px solid #444',
  paddingTop: '10px',
  textAlign: 'center',
};

const footerBottomTextStyle = {
  fontSize: '14px',
  margin: '0',
};

export default Footer;
