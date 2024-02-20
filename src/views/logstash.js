// OptionsBar.js

import React, {useState} from 'react';
import './logstash.css';

import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';







const   Logstash = () => {

    const history = useHistory();

  const redirectToResults = () => {
    history.push('/result');
  };


  const handleDownloadClick = () => {
    // Redirects to the Logstash download page
    window.open('https://www.elastic.co/downloads/logstash', '_blank');
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLinkClick = (e) => {
    e.preventDefault(); // Prevent the default anchor link behavior
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  

  return (

      <div className='data-container'>
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
      </div>

      <div className="download-section">
      <h1>Connect with Logstash <img src='logstashl.jpeg' alt='Logstash Logo' className='logstashimg' /></h1>
        <div className="download-step">
          <h2>1. Download and unzip Logstash</h2>
          <button onClick={handleDownloadClick}>Install Logstash</button>
        </div>
        <div className="download-step">
          <h2>2. Configure Logstash</h2>
          <p>Prepare a <a href="#config-file" onClick={handleLinkClick} className='config-link'>logstash.conf</a> config file.</p>
        </div>
        <div className="download-step">
          <h2>3. Run Logstash</h2>
          <code>bin/logstash -f logstash.conf</code>
        </div>
        <div className="download-step">
          <h2>4. Dive in</h2>
          <p>See the documentation for the latest up-to-date information.</p>
          {/* Add links to documentation and other resources */}
        </div>
      </div>


      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <p>Here is some random text about the Logstash configuration.</p>
            <pre><code>
              {`input {
  file {
    path => "/Users/kartik/Desktop/ds2.csv"
    start_position => "beginning"
    sincedb_path => "/dev/null"  # Use during testing to always start from the beginning of the file
  }
}

filter {
  csv {
    separator => ","  # Adjust if your CSV uses a different separator
    columns => ["process_id","type","component","message"]
    # Replace with your actual column names
  }
}

output {
  elasticsearch {
    hosts => ["https://localhost:9200"]
    index => "logifyos2"  # Name your index
    ssl => true
    ssl_certificate_verification => false
    # Optional user authentication
    user => "elastic"
    password => "53W5gRD-z55umg4jwzg3"
  }
}`}
            </code></pre>
          </div>
        </div>
      )}


      <div className="proceed-button-container">
  <button className="proceed-button" onClick={redirectToResults}>
    Proceed <span className="arrow">→</span>
  </button>
</div>







    </div>




    






















  );
};

export default Logstash;
