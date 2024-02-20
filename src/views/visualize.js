// OptionsBar.js

import React from 'react';
import './visualize.css';

import { Link } from 'react-router-dom';

const   Visualize = () => {
  

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

            <iframe src="http://localhost:5601/app/dashboards#/view/f84ba7a0-b6a9-11ee-bcf8-73327f2b6462?embed=true&_g=(refreshInterval:(pause:!t,value:60000),time:(from:now-15m,to:now))&_a=()&show-top-menu=true&show-query-input=true&show-time-filter=true" title="kibana" height="800px" width="100%"></iframe>

      
      </div>

  );
};

export default Visualize;
