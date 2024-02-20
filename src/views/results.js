// OptionsBar.js

import React from 'react';
import './results.css';


import { Link } from 'react-router-dom';

const   Results = () => {
   
  

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
            <div className="large-image">
            <iframe
    width="100%"
    height="460vh"
    src="https://www.youtube.com/embed/USWadiXu5q0?si=dV1otIMjV8sBkNpy" 
    title="YouTube video player" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen
    frameborder="0"
  ></iframe>
      </div>

      {/* Cards Section */}
      <div className="cards-container">
        <div className="card">
          <img className="card-logo" src="discover.png" alt="Discover Logo" />
          <h2>Discover</h2>
          <p>Explore your log data, monitor logs and dhhjdhjdjdj and discover insights.</p>
          <Link to="/discover" className="action-button">
            Go to Discover
          </Link>
        </div>

        <div className="card">
          <img className="card-logo" src="visualize.png" alt="Visualize Logo" />
          <h2>Visualize</h2>
          <p>Visualize log patterns and gain insights for better understanding.</p>
          <Link to="/visualize" className="action-button">
            Go to Visualize
          </Link>
        </div>

        <div className="card">
          <img className="card-logo" src="generate.png" alt="Generate Report Logo" />
          <h2>Generate Report</h2>
          <p>Generate a comprehensive pdf report for log analysis and visualizations.</p>
          <Link to="/generate-report" className="action-button">
            Generate Report
          </Link>
        </div>

        

      
      </div>
      </div>

  );
};

export default Results;
