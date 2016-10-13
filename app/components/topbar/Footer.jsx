import React from 'react';

const flags = ['Easy Conversion from BTC to USD!', 'Create a Wallet on Signup!', 'Sell things instantly!']


const Footer = () => (
  <footer className="page-footer cyan lighten-1" style={{ display: 'flex', /* minHeight: 100 + 'vh',*/ flexDirection: 'column' }}>
    <div className="footer-copyright cyan">
      <div className="container">
      © 2016 DynamicTeapots
      <a className="grey-text text-lighten-4 right" onClick={(e) =>{e.preventDefault(); return false;}}>{flags[Math.floor(Math.random()*flags.length)]}</a>
      </div>
    </div>
  </footer>
);

export default Footer;