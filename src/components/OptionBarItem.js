// OptionsBarItem.js
import React from 'react';
import { useHistory } from 'react-router-dom';
import './OptionBarItem.css'
const OptionsBarItem = ({ title, isActive, setIsActive, comp }) => {
  const history = useHistory();

  const handleItemClick = () => {
    setIsActive((prev) => ({
      Discover: false,
      Visualize: false,
      'Generate Report': false,
      [comp]: !prev[comp],
    }));

    // Adjust the route based on the clicked option
    let param = comp === 'Visualize' ? 'visualize' : comp === 'Generate Report' ? 'generate-report' : 'discover';
    history.push(`/your-base-url/${param}`);
  };

  return (
    <div className={`option ${isActive[comp] ? 'selected' : ''}`} onClick={handleItemClick}>
      {title}
    </div>
  );
};

export default OptionsBarItem;
