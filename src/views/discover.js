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
        src="https://896f-115-248-146-117.ngrok-free.app/app/discover#/view/487ed6c0-c57d-11ee-a728-97b0252dfd00?_g=(filters:!(),refreshInterval:(pause:!t,value:60000),time:(from:'2018-06-25T18:30:00.000Z',to:'2018-06-25T18:30:00.000Z'))&_a=(columns:!(),filters:!(),grid:(),hideChart:!f,index:b4313753-1a3d-40b0-a7c4-196565708882,interval:auto,query:(language:kuery,query:''),sort:!(!('@timestamp',desc)))"
        allowFullScreen
      ></iframe>
      
      </div>

  );
};

export default Discover;