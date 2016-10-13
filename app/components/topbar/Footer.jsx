import React from 'react';

const flags = ['Easy Conversion from BTC to USD!', 'Create a Wallet on Signup!', 'Sell things instantly!']

class Footer extends React.Component {
  componentDidMount() {
    $('footer').pushpin({ offset: '90%' });
  }
  render() {
    return (
      <footer className="page-footer cyan lighten-1" style={{minWidth:'100%', maxHeight:'50px', zIndex: 100}}>
        <div className="footer-copyright cyan">
          <div className="container">
          © 2016 DynamicTeapots
          <a className="grey-text text-lighten-4 right" onClick={(e) =>{e.preventDefault(); return false;}}>{flags[Math.floor(Math.random()*flags.length)]}</a>
          </div>
        </div>
      </footer>
    )
  }
}


export default Footer;