// OptionsBar.js

import React from 'react';
import './discover.css';

import { Link } from 'react-router-dom';

const   Discover = () => {
  

  return (

    
      <div className="home-header">
        <header
          data-thq="thq-navbar"
          className="navbarContainer home-navbar-interactive"
        >
          <span className="logo">LOGIFY</span>
          <div data-thq="thq-navbar-nav" className="home-desktop-menu">
            <nav className="home-links">
            <Link to="/" className="home-nav12 bodySmall">
        Home
        <br />
      </Link>
      <Link to="/connect" className="home-nav2 bodySmall">
        Connect with Elastic
      </Link>
      <Link to="/about" className="home-nav3 bodySmall">
        About
      </Link>
      <Link to="/features" className="home-nav4 bodySmall">
        Features
      </Link>
      <Link to="/pricing" className="home-nav5 bodySmall">
        Pricing
      </Link>
            </nav>
            </div>
            </header>

            <iframe
        title="Elastic Discover"
        width="100%"
        height="1000px"
        src="http://localhost:5601/app/discover#/?_g=(filters:!(),refreshInterval:(pause:!t,value:60000),time:(from:now-15m,to:now))&_a=(columns:!(),filters:!(),hideChart:!t,index:cf45e70b-f603-4634-b8b9-5d25c7652d27,interval:auto,query:(language:kuery,query:''),sort:!())"
        allowFullScreen
      ></iframe>
      
      </div>

  );
};

export default Discover;